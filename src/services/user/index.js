import express from "express"
import createError from "http-errors"
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

export default userRouter
