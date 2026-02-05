import mongoose from "mongoose";
import dotenv from "dotenv";
import Company from "../models/Company.js";

dotenv.config();

const seedCompanies = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Company.deleteMany();

    const companies = [
      {
        name: "ABC Technologies",
        industry: "IT Services",
        location: "Chennai"
      },
      {
        name: "NextGen Solutions",
        industry: "Software",
        location: "Bangalore"
      },
      {
        name: "BlueWave Corp",
        industry: "Consulting",
        location: "Hyderabad"
      },
      {
        name: "FinSmart Pvt Ltd",
        industry: "Finance",
        location: "Mumbai"
      },
      {
        name: "HealthPlus Systems",
        industry: "Healthcare",
        location: "Delhi"
      }
    ];

    await Company.insertMany(companies);
    console.log("✅ Companies seeded successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedCompanies();
