// အပေါ်ဆုံးမှာ ထည့်ပါ
require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bookingService = require("../services/booking.service");

const handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // Stripe က ပို့လိုက်တဲ့ Data မှန်/မမှန် စစ်ဆေးခြင်း
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Payment အောင်မြင်သွားရင် Booking Status ကို update လုပ်မယ်
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    // ဒီနေရာမှာ Booking ကို 'confirmed' ဖြစ်အောင် ပြောင်းပေးရပါမယ်
    console.log("Payment Succeeded:", paymentIntent.id);
  }

  res.json({ received: true });
};

module.exports = { handleWebhook };
