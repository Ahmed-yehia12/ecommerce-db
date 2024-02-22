import Joi from "joi";
import { objectIdValidation } from "../../middleware/validation.js";

export const signupSchema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")),
    repassword:Joi.string().valid(Joi.ref("password")).required(),
}).required()


export const loginSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")),
}).required()


export const changePasswordVal = Joi.object({
    password:Joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")),
    newPassword:Joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")),

}).required()