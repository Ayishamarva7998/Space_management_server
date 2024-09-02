import express from "express"
import mongoose from "mongoose"
import Dotenv from "dotenv"



Dotenv.config()
const Server = express()





// Local Host
const PORT = process.env.PORT
Server.listen(PORT,()=>{
    console.log(`Server Running in Port ${PORT}`)
})


// Connecting DB
mongoose.connect(process.env.DB)
.then(()=>console.log("Mongodb Connected"))
.catch(err => console.log(err))
