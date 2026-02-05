import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Lost"],
      default: "New"
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company"
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
