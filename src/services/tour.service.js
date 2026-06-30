const tourRepository = require("../repositories/tour.repository");
const { AppError } = require("../utils/error.handler"); // Custom Error Class

class TourService {
  /**
   * @desc Tour စာရင်းအားလုံးကို fetch လုပ်ခြင်း (With validation)
   */
  async getTours() {
    try {
      const tours = await tourRepository.findAllActive();

      // Production မှာ Data မရှိရင် Empty Array ပြန်ပေးရမယ် (Error မဟုတ်ဘူး)
      return tours || [];
    } catch (error) {
      // Internal Log စနစ်ကို ဒီနေရာမှာ ထည့်သွင်းမယ်
      console.error("Service: Error in getTours", error);
      throw new AppError("Unable to fetch tours at this moment", 500);
    }
  }

  /**
   * @desc ID ဖြင့် Tour တစ်ခုကို ရှာဖွေခြင်း (Security check ပါဝင်)
   */
  async getTourById(tourId) {
    if (!tourId) {
      throw new AppError("Invalid Tour ID", 400);
    }

    const tour = await tourRepository.findById(tourId);

    if (!tour) {
      throw new AppError("Tour not found", 404);
    }

    return tour;
  }
}

module.exports = new TourService();
