import mongoose, { Schema } from "mongoose"

// Define the Feedback schema
const FeedbackSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  reason: {
    type: String,
    required: true,
    enum: ["too_frequent", "not_relevant", "didnt_signup", "other"],
  },
  additionalFeedback: {
    type: String,
    default: "",
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
})

// Create and export the model if it doesn't exist
export const Feedback = mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema)
