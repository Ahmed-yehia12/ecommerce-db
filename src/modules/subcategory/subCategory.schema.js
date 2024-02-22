import Joi from "joi";
import { objectIdValidation } from './../../middleware/validation.js';

export const subCategorySchema = Joi.object({
    name:Joi.string().min(2).required(),
    category:Joi.custom(objectIdValidation),
    createdBy:Joi.custom(objectIdValidation)
}).required()

export const subCategoryIdSchema = Joi.object({
    id: Joi.custom(objectIdValidation).required()
}).required()

export const updateSubCategorySchema = Joi.object({
    id: Joi.custom(objectIdValidation).required(),
    name:Joi.string().min(2),
    category:Joi.custom(objectIdValidation),
    createdBy:Joi.custom(objectIdValidation)
}).required()
