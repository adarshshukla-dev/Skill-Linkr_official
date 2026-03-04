import mongoose, { Schema } from "mongoose"

// Define the Task schema
const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: String, // Email of the team member
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "process", "complete", "rejected"],
    default: "pending",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  dueDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
    default: "",
  },
})

// Create and export the model if it doesn't exist
export const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema)
