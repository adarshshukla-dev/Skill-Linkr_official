import mongoose, { Schema } from "mongoose"

// Define the TeamMember schema
const TeamMemberSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "Member",
  },
  position: {
    type: String,
    default: "",
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  active: {
    type: Boolean,
    default: true,
  },
})

// Create and export the model if it doesn't exist
export const TeamMember = mongoose.models.TeamMember || mongoose.model("TeamMember", TeamMemberSchema)
