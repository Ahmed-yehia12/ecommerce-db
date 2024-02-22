import Joi from "joi";
import { objectIdValidation } from "../../middleware/validation.js";

export const cuponSchema = Joi.object({
    code:Joi.string().min(2).required().trim(),
    expires:Joi.date().required(),

    discount:Joi.number().min(0).required(),
}).required()






export const cuponIdSchema = Joi.object({
    id: Joi.custom(objectIdValidation).required()
}).required()

export const updateCuponSchema = Joi.object({
    id: Joi.custom(objectIdValidation).required(),
    code:Joi.string().min(2).trim(),
    expires:Joi.date(),
    discount:Joi.number().min(0),
 
})
