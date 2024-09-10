import express from "express"
import mongoose from "mongoose"
import Dotenv from "dotenv"
import cors from "cors"
import adminroute from "./routes/admin_route.js"
import loginroute from "./routes/auth.js"



Dotenv.config()
const server = express()
server.use(express.json())

server.use(cors())



server.use("/api/admin",adminroute)
server.use("/api",loginroute)


// Local Host
const PORT = process.env.PORT
server.listen(PORT,()=>{
    console.log(`Server Running in Port ${PORT}`)
})


// Connecting DB
mongoose.connect(process.env.DB)
.then(()=>console.log("Mongodb Connected"))
.catch(err => console.log(err))
