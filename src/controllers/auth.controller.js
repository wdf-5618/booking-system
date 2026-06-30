const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const knex = require("../db/knex");

// Register: User အသစ်ဖန်တီးခြင်း
const register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const [user] = await knex("users")
    .insert({
      id: require("crypto").randomUUID(),
      email,
      password_hash: hashedPassword,
    })
    .returning("id");

  res
    .status(201)
    .json({ message: "User created successfully", userId: user.id });
};

// Login: Token ထုတ်ပေးခြင်း
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await knex("users").where({ email }).first();

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  res.json({ token });
};

module.exports = { register, login };
