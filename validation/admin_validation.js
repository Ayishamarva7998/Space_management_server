"use strict"
import Joi from "joi"

const admin_validation = Joi.object({
  name: Joi.string()
    .min(3)
    .max(10)
    .required(),
  
  email: Joi.string()
    .email()
    .required(),
  
  password: Joi.string()
    .min(6)
    .max(10)
    .required(),
  
  batch: Joi.array()
    .items(Joi.string().min(1))
    .default([]),  
   
   
});




export  {admin_validation};