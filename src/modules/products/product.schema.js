import Joi from "joi";
import { objectIdValidation } from './../../middleware/validation.js';

export const productSchema = Joi.object({
    title:Joi.string().min(2).trim().required(),
    description:Joi.string().min(10).max(500).required(),
    imgCover: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype :Joi.string().valid('image/jpg', 'image/jpeg').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required(),
    })).required(),
    images:Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype :Joi.string().valid('image/jpg', 'image/jpeg').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required(),
    })).required(),
    price:Joi.number().min(0).required()  ,
    priceAfterDiscount: Joi.number().min(0).optional(),
    quantity:  Joi.number().min(0).default(0).required() ,
    sold: Joi.number() ,
    rateAvg: Joi.number().min(0).max(0) ,
    rateCount: Joi.number().min(0) ,
    Category:  Joi.custom(objectIdValidation) ,
    subCategory: Joi.custom(objectIdValidation),
    brand: Joi.custom(objectIdValidation) ,
    createdBy:Joi.custom(objectIdValidation).optional()
}).required()

export const productIdSchema = Joi.object({
    id: Joi.custom(objectIdValidation).required()
}).required()

export const updateSchema=Joi.object({
    id: Joi.custom(objectIdValidation).required(),
    title:Joi.string().min(2).trim(),
    description:Joi.string().min(10).max(500),
    imgCover: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype :Joi.string().valid('image/jpg', 'image/jpeg').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required(),
    })),
    images:Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype :Joi.string().valid('image/jpg', 'image/jpeg').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880),
    })),
    price:Joi.number().min(0)  ,
    priceAfterDiscount: Joi.number().min(0).optional(),
    quantity:  Joi.number().min(0).default(0) ,
    sold: Joi.number() ,
    rateAvg: Joi.number().min(0).max(0) ,
    rateCount: Joi.number().min(0) ,
    Category:  Joi.custom(objectIdValidation) ,
    subCategory: Joi.custom(objectIdValidation),
    brand: Joi.custom(objectIdValidation) ,
    createdBy:Joi.custom(objectIdValidation).optional()
}).required()