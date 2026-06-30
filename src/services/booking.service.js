// src/services/booking.service.js
const bookingRepository = require("../repositories/booking.repository");
const tourRepository = require("../repositories/tour.repository");
const knex = require("../db/knex");
const { AppError } = require("../utils/error.handler");

class BookingService {
  async createBooking(userId, tourId, bookingDetails) {
    return await knex.transaction(async (trx) => {
      // 1. Tour ရှိမရှိ စစ်ဆေးပြီး lock လုပ်မယ် (FOR UPDATE)
      const tour = await trx("tours")
        .where({ id: tourId, is_active: true })
        .forUpdate()
        .first();

      if (!tour) {
        throw new AppError("Tour not available", 404);
      }

      // 2. Seat လုံလောက်မှု ရှိမရှိ စစ်ဆေးမယ်
      if (tour.available_seats <= 0) {
        throw new AppError("No seats available", 409);
      }

      // 3. Booking Record ထည့်မယ်
      const [booking] = await trx("bookings")
        .insert({
          user_id: userId,
          tour_id: tourId,
          total_price: tour.price_thb,
          status: "pending",
          ref_code: `BK-${Date.now()}`, // Production မှာ UUID သို့မဟုတ် random generator သုံးပါ
        })
        .returning("*");

      // 4. Tour Seat ကို လျှော့ချမယ်
      await trx("tours").where({ id: tourId }).decrement("available_seats", 1);

      return booking;
    });
  }

  async getUserBookingHistory(userId) {
    // Booking တွေကို Tour အချက်အလက်နဲ့ တွဲပြီး ဆွဲထုတ်မယ်
    return knex("bookings")
      .join("tours", "bookings.tour_id", "=", "tours.id")
      .select(
        "bookings.id",
        "bookings.status",
        "bookings.created_at",
        "tours.name as tour_name",
        "tours.price_thb",
      )
      .where("bookings.user_id", userId)
      .orderBy("bookings.created_at", "desc");
  }
}

module.exports = new BookingService();
