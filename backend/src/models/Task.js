import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending"
    },
    dueDate: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
