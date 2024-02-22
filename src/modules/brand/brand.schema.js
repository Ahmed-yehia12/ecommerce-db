import Joi from "joi";
import { objectIdValidation } from './../../middleware/validation.js';

export const brandSchema = Joi.object({
    name:Joi.string().min(2).required(),
    logo:Joi.string(),
    createdBy:Joi.custom(objectIdValidation)
}).required()

export const brandIdSchema = Joi.object({
    id: Joi.custom(objectIdValidation).required()
}).required()


export const updateBrandSchema= Joi.object({
    id: Joi.custom(objectIdValidation).required(),

    name:Joi.string().min(2),
    logo:Joi.string(),
    createdBy:Joi.custom(objectIdValidation)
}).required()