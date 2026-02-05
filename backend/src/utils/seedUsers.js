import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany();

    const users = [
      {
        name: "John Doe",
        email: "john@crm.com",
        password: await bcrypt.hash("password123", 10)
      },
      {
        name: "Ravi Kumar",
        email: "ravi@crm.com",
        password: await bcrypt.hash("password123", 10)
      },
      {
        name: "Priya Sharma",
        email: "priya@crm.com",
        password: await bcrypt.hash("password123", 10)
      },
      {
        name: "Amit Verma",
        email: "amit@crm.com",
        password: await bcrypt.hash("password123", 10)
      },
      {
        name: "Sneha Iyer",
        email: "sneha@crm.com",
        password: await bcrypt.hash("password123", 10)
      }
    ];

    await User.insertMany(users);
    console.log("✅ Users seeded successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedUsers();
