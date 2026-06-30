const request = require("supertest");
const app = require("../src/app");
const bookingService = require("../src/services/booking.service");
const knex = require("../src/db/knex"); // Knex ကို import လုပ်ပါ
const jwt = require("jsonwebtoken"); // JWT ကို import လုပ်ပါ
const { task } = require("../src/jobs/cleanup.job");

// 1. JWT ကို Mock လုပ်ခြင်း (Token အမြဲ မှန်နေစေရန်)
jest.mock("jsonwebtoken");
jest.mock("../src/services/booking.service");

describe("GET /bookings/history", () => {
  it("should return history for logged-in user", async () => {
    // JWT Mock: verify လုပ်ရင် အဆင်ပြေတယ်လို့ သတ်မှတ်ပြီး user object ပြန်ပေးမယ်
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, { id: "user123" }); // Fake user
    });

    bookingService.getUserBookingHistory.mockResolvedValue([
      { id: "h1", tour_name: "City Tour" },
    ]);

    const res = await request(app)
      .get("/api/bookings/history")
      .set("Authorization", "Bearer valid-token");

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].tour_name).toBe("City Tour");
  });
});

afterAll(async () => {
  task.stop(); // Cron Timer ကို ပိတ်ပေးလိုက်မယ်
  await knex.destroy(); // DB Connection ကို ပိတ်မယ်
});
