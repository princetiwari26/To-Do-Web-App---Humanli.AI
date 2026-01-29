import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    description: String,
    color: String,
  },
  { timestamps: true },
);

export default mongoose.model("Board", boardSchema);