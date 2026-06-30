// src/db/knex.js
const knex = require("knex");
const knexfile = require("../../knexfile");

// Test လုပ်တဲ့အခါ environment ကို 'development' လို့ အတင်းသတ်မှတ်ပေးလိုက်ပါ
const environment = process.env.NODE_ENV || "development";

console.log("--- DEBUG INFO ---");
console.log("Current Environment:", environment);
console.log("Available keys in knexfile:", Object.keys(knexfile));

// အကယ်၍ environment မရှိရင် development ကို default သုံးမယ်
const config = knexfile[environment] || knexfile.development;

if (!config) {
  throw new Error(
    `Knex configuration for environment '${environment}' not found!`,
  );
}

const db = knex(config);

module.exports = db;
