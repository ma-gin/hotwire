import mongoose from "mongoose"

const { Schema, model } = mongoose

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String },
    role: { type: String, enum: ["guest", "host"], default: "guest" },
  },
  { timestamps: true }
)

export default model("User", userSchema)
