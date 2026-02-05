import User from "../models/User.js";

export const getUsers = async (req, res) => {
  const users = await User.find().select("_id name");
  res.json(users);
};
