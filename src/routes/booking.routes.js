const express = require("express");
const router = express.Router();

// Controller ကို Object အနေနဲ့ အပြည့်အစုံ Import လုပ်ပါ
const bookingController = require("../controllers/booking.controller");
const { validateBooking } = require("../middlewares/validate.middleware");
const { requireAuth } = require("../middlewares/auth.middleware");

// Routes
// အခုဆိုရင် bookingController ထဲက function တွေကို အဆင်ပြေသွားပါပြီ
router.get("/history", requireAuth, bookingController.getHistory);

router.post("/", requireAuth, validateBooking, bookingController.createBooking);

module.exports = router;
