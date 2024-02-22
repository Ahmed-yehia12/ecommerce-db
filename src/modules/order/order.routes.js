import { Router } from "express";

import { protectedRoute } from "../../middleware/protectedRoutes.js";
import { allowedTo } from "../../middleware/roles.js";
import { validation } from "../../middleware/validation.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as orderController from './order.controller.js'
import { createOrderSchema } from "./order.schema.js";



 const orderRouter = Router();

 orderRouter.get('/allOrders',protectedRoute,allowedTo('admin'),asyncHandler(orderController.getAllOrder))

 orderRouter
 .route('/')
//  .post(protectedRoute,allowedTo('user'),validation(addToCartSchema),asyncHandler(cartController.addToCart))
 .get(protectedRoute,allowedTo('user'),asyncHandler(orderController.getLoggedUserOrder))
//  .delete(protectedRoute,allowedTo('user'),asyncHandler(cartController.clearUserCart))

 orderRouter
 .route('/:id')
//  .delete(protectedRoute,allowedTo('user'),validation(cartIdSchema),asyncHandler(cartController.removeFromCart))
 .post(protectedRoute,allowedTo('user'),validation(createOrderSchema),asyncHandler(orderController.createCashOrder))

orderRouter.post('/checkOut/:id', protectedRoute,allowedTo('user'),asyncHandler(orderController.createCheckOutSession))

 export default orderRouter
 