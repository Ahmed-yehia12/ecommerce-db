import Joi from "joi";
import { objectIdValidation } from "../../middleware/validation.js";

export const addToCartSchema = Joi.object({

    product:Joi.custom(objectIdValidation),
    quantity:Joi.number().integer().options({convert:false}),


}).required()



    




export const cartIdSchema = Joi.object({
    id: Joi.custom(objectIdValidation).required()
}).required()

export const updateQTYSchema = Joi.object({
    id: Joi.custom(objectIdValidation).required(),
    quantity:Joi.number().integer().options({convert:false}),



}).required()


export const applyCuponSchema= Joi.object({
    cupon:Joi.string().min(2).required().trim()


}).required()
