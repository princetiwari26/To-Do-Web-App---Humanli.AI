import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    board: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
    title: { type: String, required: true },
    description: String,
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    dueDate: Date,
    completed: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model("Todo", todoSchema);