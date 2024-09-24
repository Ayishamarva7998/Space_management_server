"use strict"
import express from "express"
import { login } from "../controllers/login.js"
import { trycatch } from "../middleware/trycatch.js"
import validate from "../middleware/validate.js"
import { login_validation } from "../validation/login_validation.js"



const route = express.Router()
route.post("/login",validate(login_validation),trycatch(login))


export default route