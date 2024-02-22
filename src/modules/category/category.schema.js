import Joi from "joi";
import { objectIdValidation } from './../../middleware/validation.js';

export const categorySchema = Joi.object({
    name:Joi.string().min(2).required().trim(),
    image:Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype :Joi.string().valid('image/jpg', 'image/jpeg').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required(),
    }).required() ,
    createdBy:Joi.custom(objectIdValidation)
}).required()

export const categoryIdSchema = Joi.object({
    id: Joi.custom(objectIdValidation).required()
}).required()


export const updateCategorySchema = Joi.object({
    id: Joi.custom(objectIdValidation).required(),
    name:Joi.string().min(2).trim(),
    image:Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype :Joi.string().valid('image/jpg', 'image/jpeg').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required(),
    }) ,
    createdBy:Joi.custom(objectIdValidation)
}).required()