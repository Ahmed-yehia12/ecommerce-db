
import Joi from "joi";
import { objectIdValidation } from './../../middleware/validation.js';

export const addUserVal = Joi.object({
    name:Joi.string().min(2).required(),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
    repassword:Joi.valid(Joi.ref('password')).required()
}).required()

export const userIdSchema = Joi.object({
    id: Joi.custom(objectIdValidation).required()
}).required()

export const updateUserVal = Joi.object({
    id: Joi.custom(objectIdValidation).required(),
    name:Joi.string().min(2),
    email:Joi.string().email(),
    password:Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    role:Joi.string().valid('user','admin')
}).required()