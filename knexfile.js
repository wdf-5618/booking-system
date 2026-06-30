/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require("dotenv").config(); // Environment Variables များဖတ်ရန်

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST || "127.0.0.1",
      user: process.env.DB_USER || "user",
      password: process.env.DB_PASSWORD || "password",
      database: process.env.DB_NAME || "goat_db",
    },
    migrations: { directory: "./migrations" },
  },

  test: {
    // CI/CD အတွက် အထူးလိုအပ်သော Test Environment
    client: "pg",
    connection: {
      host: process.env.DB_HOST || "db", // Docker container နာမည်
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: { directory: "./migrations" },
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL, // Production မှာ URL တစ်ကြောင်းတည်းနဲ့ ချိတ်ဆက်ဖို့ ပိုကောင်းပါတယ်
    pool: { min: 2, max: 10 },
    migrations: { tableName: "knex_migrations" },
  },
};
