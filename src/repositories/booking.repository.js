// src/repositories/booking.repository.js
const knex = require("../db/knex");

class BookingRepository {
  /**
   * Booking အသစ်တစ်ခု ဖန်တီးခြင်း
   * @param {Object} bookingData
   * @param {Object} trx (Transaction object)
   */
  async create(bookingData, trx) {
    return knex("bookings")
      .transacting(trx) // Transaction ကို လက်ခံသုံးစွဲမယ်
      .insert(bookingData)
      .returning("*");
  }

  // လိုအပ်ပါက အခြား method များ ထပ်ထည့်နိုင်ပါတယ်
  async findByUserId(userId) {
    return knex("bookings").where({ user_id: userId });
  }
}

module.exports = new BookingRepository();
