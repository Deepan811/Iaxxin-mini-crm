import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.time("Login User Query");
  const user = await User.findOne({ email });
  console.timeEnd("Login User Query");

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  console.time("Bcrypt Compare");
  const isMatch = await bcrypt.compare(password, user.password);
  console.timeEnd("Bcrypt Compare");
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id)
  });
};
