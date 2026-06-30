const bookingService = require("../services/booking.service");

const createBooking = async (req, res) => {
  try {
    const { tourId, paymentData, guestEmail } = req.body;

    // Auth Error ရှိရင် Warning အနေနဲ့ မှတ်ထားမယ်
    const authWarning = req.authError
      ? "Login failed, processed as guest."
      : null;

    // User ရှိရင် Member ID သုံးမယ်၊ မရှိရင် null ထားမယ်
    const userId = req.user ? req.user.id : null;

    // Guest ဖြစ်ရင် email ပါမှ ရမယ်
    if (!userId && !guestEmail) {
      return res.status(400).json({
        success: false,
        message: "Guest booking requires an email address.",
      });
    }

    const booking = await bookingService.createBooking(userId, tourId, {
      paymentData,
      guestEmail,
    });

    res.status(201).json({
      success: true,
      message: userId
        ? "Member booking successful"
        : "Guest booking successful",
      warning: authWarning, // Error ရှိရင် ဒီနေရာမှာ ဖော်ပြပေးမယ်
      data: booking,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const history = await bookingService.getUserBookingHistory(userId);

    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createBooking, getHistory };
