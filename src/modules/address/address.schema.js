import Joi from "joi";
import { objectIdValidation } from "../../middleware/validation.js";

export const addAddressVal = Joi.object({

    street:Joi.string().trim().required(),
    phone:Joi.string().trim().required(),
    city:Joi.string().trim().required()
   
}).required()



    




export const addressIdSchema = Joi.object({
    id: Joi.custom(objectIdValidation).required()
}).required()

export const addressSchema = Joi.object({
    id: Joi.custom(objectIdValidation).required(),
 street:Joi.string().trim,
    phone:Joi.string().trim,
    city:Joi.string().trim
}).required()
