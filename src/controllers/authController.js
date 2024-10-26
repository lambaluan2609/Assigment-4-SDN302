import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const register = async (req, res) => {
  const { fullName, username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ success: false, message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { id: newUser._id, fullName, username }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ success: false, message: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid username or password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ success: true, message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { register, login };