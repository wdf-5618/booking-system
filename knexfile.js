// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg", // SQLite အစား pg ကို ပြောင်းပေးပါ
    connection: {
      host: "127.0.0.1",
      user: "user", // docker-compose ထဲက user
      password: "password", // docker-compose ထဲက password
      database: "goat_db", // docker-compose ထဲက db name
    },
    migrations: {
      directory: "./migrations",
    },
  },

  staging: {
    client: "pg",
    connection: {
      database: "goat_db",
      user: "user",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "pg",
    connection: {
      database: "goat_db",
      user: "user",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
