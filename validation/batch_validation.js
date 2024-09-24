"use strict";
import Joi from "joi";

const batch_validation = Joi.object({
  batch: Joi.array()
    .items(
      Joi.string()
        .pattern(/^[1-20]$/)
        .required()
    )
    .required(), 
});

export { batch_validation };
