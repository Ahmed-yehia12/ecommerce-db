import { Router } from "express";

import * as wishListController from './wishList.controller.js'
import { protectedRoute } from "../../middleware/protectedRoutes.js";
import { allowedTo } from "../../middleware/roles.js";
import { validation } from "../../middleware/validation.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addProductToWishListVal, wishListIdSchema } from "./wishList.schema.js";




 const wishListRouter = Router();

 wishListRouter
 .route('/')
 .patch(protectedRoute,allowedTo('user'),validation(addProductToWishListVal),asyncHandler(wishListController.addToWishList))
 .get(protectedRoute,allowedTo('user'),asyncHandler(wishListController.getLoggedUserWishList))


 wishListRouter
 .route('/:id')
 .delete(protectedRoute,allowedTo('admin','user'),validation(wishListIdSchema),asyncHandler(wishListController.removeFromWishList))



 export default wishListRouter
 