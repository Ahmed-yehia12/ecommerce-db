import Joi from "joi";
import { objectIdValidation } from "../../middleware/validation.js";

export const reviewSchema = Joi.object({
    text:Joi.string().min(2).required().trim(),
    rate:Joi.number().min(0).max(5).required(),

    product:Joi.custom(objectIdValidation).required(),
}).required()



    




export const reviewIdSchema = Joi.object({
    id: Joi.custom(objectIdValidation).required()
}).required()

export const updatereviewSchema = Joi.object({
    id: Joi.custom(objectIdValidation).required(),
    text:Joi.string().min(2).trim(),
    rate:Joi.number().min(0).max(5),

    product:Joi.custom(objectIdValidation),
}).required()
