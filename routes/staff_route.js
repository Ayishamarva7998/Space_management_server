"use strict"
import express from "express"

import {  createStaff, delete_staff, getallstaff,   updatestaff } from "../controllers/staff.js"
import uploadImage from "../middleware/uploadImg.js"
import { trycatch } from "../middleware/trycatch.js"


const route = express.Router()
route.post("/staff",uploadImage,trycatch(createStaff))
route.patch("/staff/:id",uploadImage,trycatch(updatestaff))
route.get("/staff",trycatch(getallstaff))
route.delete("/staff/:id",trycatch(delete_staff))

export default route