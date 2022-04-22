import express from "express"
import createError from "http-errors"
import { generateAccessToken } from "../../auth/auth.js"
import UserModel from "./model.js"

const userRouter = express.Router()

userRouter.post("/", async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body)
    const { _id } = await newUser.save()
    res.status(201).send({ _id })
  } catch (error) {
    next(error)
  }
})

userRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await UserModel.checkCredentials(email, password)
    if (user) {
      const accessToken = await generateAccessToken({
        _id: user._id,
        role: user.role,
      })
      res.send({ accessToken })
    } else {
      next(createError(401, "Check username/password"))
    }
  } catch (error) {
    next(error)
  }
})

export default userRouter
