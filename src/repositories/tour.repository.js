// src/repositories/tour.repository.js
const knex = require("../db/knex"); // DB connection configuration

class TourRepository {
  // Tour အားလုံးကို အလွယ်တကူ ရှာဖွေခြင်း
  async findAllActive() {
    return knex("tours")
      .select("*")
      .where("is_active", true)
      .orderBy("created_at", "desc");
  }

  // ID နဲ့ ရှာဖွေခြင်း
  async findById(id) {
    return knex("tours").where({ id }).first();
  }

  // အသစ်တစ်ခု ထည့်ခြင်း
  async create(tourData) {
    return knex("tours").insert(tourData).returning("*");
  }
}

module.exports = new TourRepository();
