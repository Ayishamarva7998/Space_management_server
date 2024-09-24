"use strict";
import Joi from "joi";

const login_validation = Joi.object({
    email: Joi.string()
    .email()
    .required(),
  
  password: Joi.string()
    .min(6)
    .max(10)
    .required()
});

export {login_validation}; 

