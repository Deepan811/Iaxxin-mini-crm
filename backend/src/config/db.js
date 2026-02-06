import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.time("MongoDB Connection");
    await mongoose.connect(process.env.MONGO_URI, {
      connectTimeoutMS: 30000, // Give 30 seconds for initial connection
      socketTimeoutMS: 45000, // Keep sockets open for 45 seconds of inactivity
      serverSelectionTimeoutMS: 30000 // Keep trying to send operations for 30 seconds
    });
    console.timeEnd("MongoDB Connection");
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
