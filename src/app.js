const express = require("express");
const app = express();
const bookingRoutes = require("./routes/booking.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

// ခေါ်ယူထားသော Job/Tasks
require("./jobs/cleanup.job");

// Middleware
app.use(express.json());

// Routes
app.use("/api/bookings", bookingRoutes);

// API Documentation Endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Test လုပ်ဖို့အတွက် app ကို export လုပ်ပေးပါ
module.exports = app;
