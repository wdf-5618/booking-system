const cron = require("node-cron");
const knex = require("../db/knex");

// နေ့တိုင်း ည ၁၂ နာရီမှာ အလုပ်လုပ်မယ်
const task = cron.schedule("0 0 * * *", async () => {
  console.log("Running cleanup task for guest bookings...");

  // ၃၀ ရက်ကျော်သွားတဲ့ Guest Booking တွေကို ဖျက်မယ်
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const deletedCount = await knex("bookings")
    .whereNull("user_id") // Guest တွေကိုပဲ ရွေးမယ်
    .andWhere("created_at", "<", thirtyDaysAgo) // ရက်ကျော်နေတဲ့ဟာတွေ
    .del();

  console.log(`Deleted ${deletedCount} old guest bookings.`);
});

module.exports = { task };
