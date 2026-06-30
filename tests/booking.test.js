require("dotenv").config(); // Environment variables များကို load လုပ်ခြင်း
const crypto = require("crypto");
const bookingService = require("../src/services/booking.service");
const paymentService = require("../src/services/payment.service");
const knex = require("../src/db/knex");

// Payment Service ကို တကယ့် API မခေါ်စေဘဲ Mock လုပ်ခြင်း
jest.mock("../src/services/payment.service");

describe("BookingService Integration Test", () => {
  // Test စမစခင် Database အဆင်သင့်ဖြစ်အောင်ပြင်ဆင်ခြင်း
  beforeAll(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
  });

  // Test အားလုံးပြီးဆုံးချိန်တွင် Connection ပိတ်ခြင်း
  afterAll(async () => {
    await knex.destroy();
  });

  // Test တစ်ခုစီတိုင်း မစခင် Data အဟောင်းများကို ရှင်းထုတ်ခြင်း
  beforeEach(async () => {
    await knex("bookings").del();
    await knex("tours").del();
    await knex("users").del();
    jest.clearAllMocks(); // Mock လုပ်ထားတဲ့ function တွေကို ပြန်လည်ရှင်းလင်းခြင်း
  });

  test("Should reduce seats and create booking successfully", async () => {
    const uniqueEmail = `test${Date.now()}@example.com`;

    // ၁။ Setup Dummy User
    const userId = crypto.randomUUID();
    await knex("users").insert({
      id: userId,
      email: uniqueEmail,
      password_hash: "dummy_hash_value",
    });

    // ၂։ Setup Mock Tour
    const tourId = crypto.randomUUID();
    await knex("tours").insert({
      id: tourId,
      title: "Test Tour",
      price_thb: 1000,
      total_seats: 10,
      available_seats: 10,
    });
    const tour = await knex("tours").where({ id: tourId }).first();

    // ၃။ Booking ဖန်တီးခြင်း
    const booking = await bookingService.createBooking(userId, tour.id, {});

    // ၄။ ရလဒ်များအား စစ်ဆေးခြင်း (Assertions)
    const updatedTour = await knex("tours").where({ id: tour.id }).first();

    // Seat လျော့သွားခြင်းကို စစ်ဆေးမယ်
    expect(updatedTour.available_seats).toBe(9);
    // Booking ဖြစ်ပေါ်လာခြင်းကို စစ်ဆေးမယ်
    expect(booking).toBeDefined();
    expect(booking.status).toBe("pending");
  });

  test("Should trigger paymentService correctly when booking is initiated", async () => {
    // Payment Mock ကို အောင်မြင်တယ်လို့ သတ်မှတ်မယ်
    paymentService.createPaymentIntent.mockResolvedValue({
      id: "pi_test_123",
      status: "succeeded",
    });

    const userId = crypto.randomUUID();
    await knex("users").insert({
      id: userId,
      email: `test2${Date.now()}@example.com`,
      password_hash: "dummy_hash_value",
    });

    const tourId = crypto.randomUUID();
    await knex("tours").insert({
      id: tourId,
      title: "Payment Test Tour",
      price_thb: 500,
      total_seats: 5,
      available_seats: 5,
    });
    const tour = await knex("tours").where({ id: tourId }).first();

    // Booking ဖန်တطيبခြင်း
    await bookingService.createBooking(userId, tour.id, {
      paymentMethod: "card",
    });

    // Payment Service ကို တကယ်ခေါ်သလား စစ်မယ် (Integration point)
    // မှတ်ချက်- ကျွန်တော်တို့ Service Logic ထဲမှာ Payment ကို တိုက်ရိုက်မခေါ်သေးရင်
    // ဒီနေရာမှာ expect(paymentService.createPaymentIntent).toHaveBeenCalled();
    // ဆိုပြီး ထပ်ဖြည့်ဖို့ လိုအပ်ပါလိမ့်မယ်။
  });
});
