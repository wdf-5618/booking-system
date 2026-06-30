const jwt = require("jsonwebtoken");

// ၁။ Login ဝင်ထားမှ ရမည့် Middleware (Protected Route)
const requireAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Authentication required" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Invalid token" });
    }
    req.user = user; // User data ကို request ထဲထည့်ပေးလိုက်မယ်
    next(); // ရှေ့ဆက်သွားမယ်
  });
};

// ၂။ Login ရှိလည်းရ၊ မရှိလည်းရမည့် Middleware (Optional Auth)
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        // Token မှားနေရင် Error အနေနဲ့မှတ်ထားပြီး ရှေ့ဆက်ခွင့်ပေးမယ်
        req.authError = "Invalid or expired token";
      } else {
        req.user = user;
      }
      next();
    });
  } else {
    next(); // Token မပါရင် Guest အနေနဲ့ပဲ ရှေ့ဆက်သွားမယ်
  }
};

module.exports = { requireAuth, optionalAuth };
