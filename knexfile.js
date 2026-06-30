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

  test: (() => {
    const testClient =
      process.env.DB_CLIENT || (process.env.DB_HOST ? "pg" : "sqlite3");
    const connection =
      testClient === "sqlite3"
        ? { filename: "./test.sqlite3" }
        : {
            host: process.env.DB_HOST || "db",
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
          };

    return {
      client: testClient,
      connection,
      useNullAsDefault: testClient === "sqlite3",
      migrations: { directory: "./migrations" },
    };
  })(),

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL, // Production မှာ URL တစ်ကြောင်းတည်းနဲ့ ချိတ်ဆက်ဖို့ ပိုကောင်းပါတယ်
    pool: { min: 2, max: 10 },
    migrations: { tableName: "knex_migrations" },
  },
};
