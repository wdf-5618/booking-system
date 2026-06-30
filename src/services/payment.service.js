const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

class PaymentService {
  async createPaymentIntent(amount, currency = "thb") {
    // PaymentIntent တည်ဆောက်ခြင်း
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe က cent နဲ့ တွက်ပါတယ်
      currency: currency,
      payment_method_types: ["card"],
    });

    return paymentIntent;
  }
}

module.exports = new PaymentService();
