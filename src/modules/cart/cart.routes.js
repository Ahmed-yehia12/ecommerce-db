import { Router } from "express";

import { protectedRoute } from "../../middleware/protectedRoutes.js";
import { allowedTo } from "../../middleware/roles.js";
import { validation } from "../../middleware/validation.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addToCartSchema, applyCuponSchema, cartIdSchema, updateQTYSchema } from "./cart.schema.js";
import * as cartController from './cart.controller.js'



 const cartRouter = Router();

 cartRouter
 .route('/')
 .post(protectedRoute,allowedTo('user'),validation(addToCartSchema),asyncHandler(cartController.addToCart))
 .get(protectedRoute,allowedTo('user'),asyncHandler(cartController.getLoggedUserCart))
 .delete(protectedRoute,allowedTo('user'),asyncHandler(cartController.clearUserCart))

 cartRouter.post('/applyCupon',protectedRoute,allowedTo('user'),validation(applyCuponSchema),asyncHandler(cartController.applyCupon))

 cartRouter
 .route('/:id')
 .delete(protectedRoute,allowedTo('user'),validation(cartIdSchema),asyncHandler(cartController.removeFromCart))
 .patch(protectedRoute,allowedTo('user'),validation(updateQTYSchema),asyncHandler(cartController.updateCartQuantity))



 export default cartRouter
 