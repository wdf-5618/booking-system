exports.up = async function (knex) {
  return knex.schema.createTable("bookings", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));

    // Foreign Keys (Users နဲ့ Tours ကို ချိတ်ဆက်ခြင်း)
    table.uuid("user_id").references("id").inTable("users").onDelete("CASCADE");
    table.uuid("tour_id").references("id").inTable("tours").onDelete("CASCADE");

    table.string("ref_code").unique().notNullable(); // Booking Reference (e.g., BK-12345)
    table.string("status").defaultTo("pending"); // pending, confirmed, cancelled
    table.decimal("total_price", 12, 2).notNullable();

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("bookings");
};
