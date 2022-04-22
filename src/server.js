import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import listEndpoints from "express-list-endpoints"
import userRouter from "./services/user/index.js"
import {
  badRequestHandler,
  forbiddenHandler,
  genericErrorHandler,
  notFoundHandler,
  unauthorizedHandler,
} from "./error.js"

const server = express()

const PORT = process.env.PORT || 3001

//-------------------MIDDLEWARES-------------------

server.use(cors())
server.use(express.json())

//-------------------ENDPOINTS-------------------

server.use("/user", userRouter)

//-------------------ERROR HANDLERS-------------------

server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(unauthorizedHandler)
server.use(forbiddenHandler)
server.use(genericErrorHandler)

//-------------------CONNECTION-------------------

mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on("connected", () => {
  console.table(listEndpoints(server))
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}
Started on ${new Date()}`)
  })
})
