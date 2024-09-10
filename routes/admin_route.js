import express from "express"
import { createAdmin } from "../controllers/admin.js"


const route = express.Router()
route.post("/admin",createAdmin)



export default route