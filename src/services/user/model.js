import mongoose from "mongoose"
import bcrypt from "bcrypt"

const { Schema, model } = mongoose

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String },
    role: { type: String, enum: ["guest", "host"], default: "guest" },
  },
  { timestamps: true }
)

userSchema.pre("save", async function (next) {
  const pass = this.password
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(pass, 10)
    this.password = hash
  }
  next()
})

userSchema.methods.toJSON = function () {
  const userObject = this.toObject()
  delete userObject.password
  delete userObject.__v

  return userObject
}

userSchema.statics.checkCredentials = async function (email, pass) {
  const user = await this.findOne({ email })
  if (user) {
    const isMatch = await bcrypt.compare(pass, user.password)
    if (isMatch) return user
    return null
  }
}

export default model("User", userSchema)
