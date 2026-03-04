import mongoose, { Schema } from "mongoose"

// Define the Subscriber schema
const SubscriberSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  subscribeDate: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
})

// Create and export the model if it doesn't exist
export const Subscriber = mongoose.models.Subscriber || mongoose.model("Subscriber", SubscriberSchema)
