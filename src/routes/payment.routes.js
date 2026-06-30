const express = require("express");
const { handleWebhook } = require("../controllers/payment.controller");

const router = express.Router();

// အရေးကြီး: Webhook အတွက် express.raw() ကို သုံးရပါမယ်
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleWebhook,
);

module.exports = router;
