class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    // 4xx က client error, 5xx က server error
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    // Stack trace ကို မှတ်သားထားမယ် (Debugging လုပ်ဖို့ လွယ်အောင်)
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { AppError };
