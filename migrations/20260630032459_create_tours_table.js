/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  if (knex.client.config.client === "pg") {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  }

  return knex.schema.createTable("tours", (table) => {
    if (knex.client.config.client === "pg") {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    } else {
      table.string("id").primary();
    }
    table.string("title").notNullable();
    table.text("description");
    table.decimal("price_thb", 12, 2).notNullable();
    table.integer("total_seats").notNullable();
    table.boolean("is_active").defaultTo(true);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("tours");
};
