const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Booking System API",
      version: "1.0.0",
      description: "API Documentation for Booking System",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  // သင်၏ Route ဖိုင်များရှိရာနေရာကို ညွှန်းပေးပါ
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);
