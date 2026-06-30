const Joi = require("joi");

const validateBooking = (req, res, next) => {
  const schema = Joi.object({
    tourId: Joi.string().uuid().required(), // UUID ဖြစ်ရမယ်
    paymentData: Joi.object().required(), // Object ဖြစ်ရမယ်
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next(); // အားလုံးမှန်ရင် Controller ဆီ ဆက်သွားမယ်
};

module.exports = { validateBooking };
