import Joi from "joi";
import { objectIdValidation } from "../../middleware/validation.js";

export const addProductToWishListVal = Joi.object({

    product:Joi.custom(objectIdValidation).required(),
}).required()



    




export const wishListIdSchema = Joi.object({
    id: Joi.custom(objectIdValidation).required()
}).required()

export const updateWishListSchema = Joi.object({
    id: Joi.custom(objectIdValidation).required(),

    product:Joi.custom(objectIdValidation),
}).required()
