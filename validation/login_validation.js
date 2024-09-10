import Joi from "joi";

const UserJoi = Joi.object({
    Email: Joi.string()
        .email({ tlds: { allow: false } }) 
        .required(), 
    Password: Joi.string()
        .min(6)
        // .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")) 
        .required() 
});

export default UserJoi;
