exports.up = async function (knex) {
  return knex.schema.createTable("users", (table) => {
    if (knex.client.config.client === "pg") {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    } else {
      table.string("id").primary();
    }
    table.string("email").unique().notNullable(); // Email ကို unique ထားမယ်
    table.text("password_hash").notNullable(); // Password ကို hashing လုပ်ပြီးမှ သိမ်းမယ်
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
