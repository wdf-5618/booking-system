const request = require("supertest");
const express = require("express");
const { createBooking } = require("../src/controllers/booking.controller");
const bookingService = require("../src/services/booking.service");

// Mock service
jest.mock("../src/services/booking.service");

const app = express();
app.use(express.json());
// Auth middleware အတု
app.use((req, res, next) => {
  req.user = { id: "test-user-id" }; // Mock user
  next();
});
app.post("/bookings", createBooking);

describe("POST /bookings", () => {
  it("should create a booking successfully", async () => {
    bookingService.createBooking.mockResolvedValue({ id: "123" });

    const res = await request(app)
      .post("/bookings")
      .send({ tourId: "tour-123", paymentData: {} });

    expect(res.statusCode).toBe(201);
    expect(res.body.data.id).toBe("123");
  });
});
