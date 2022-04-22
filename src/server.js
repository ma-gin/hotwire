import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import listEndpoints from "express-list-endpoints"
import userRouter from "./services/user/index.js"

const server = express()

const PORT = process.env.PORT || 3001

//-------------------MIDDLEWARES-------------------

server.use(cors())
server.use(express.json())

//-------------------ENDPOINTS-------------------

server.use("/register", userRouter)

//-------------------ERROR HANDLERS-------------------

//-------------------CONNECTION-------------------

mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on("connected", () => {
  console.table(listEndpoints(server))
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}
Started on ${new Date()}`)
  })
})
