"use strict"
import express from "express"
import { add_batch, createAdmin } from "../controllers/admin.js"
import { trycatch } from "../middleware/trycatch.js"
import validate from "../middleware/validate.js"
import { admin_validation } from "../validation/admin_validation.js"
import { batch_validation } from "../validation/batch_validation.js"
import { getdatafromid } from "../controllers/common.js"



const route = express.Router()
route.post("/admin",validate(admin_validation),trycatch(createAdmin))
route.get("/profile/:id",trycatch(getdatafromid))
route.patch("/batch/:adminid",validate(batch_validation),trycatch(add_batch))



export default route