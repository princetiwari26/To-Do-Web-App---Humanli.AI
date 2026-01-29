import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../utils/token.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  res.json({ token: generateToken(user) });
};