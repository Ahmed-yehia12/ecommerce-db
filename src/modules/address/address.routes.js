import { Router } from "express";

import * as addressController from './address.controller.js'
import { protectedRoute } from "../../middleware/protectedRoutes.js";
import { allowedTo } from "../../middleware/roles.js";
import { validation } from "../../middleware/validation.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addAddressVal, addressIdSchema } from "./address.schema.js";




 const addressRouter = Router();

 addressRouter
 .route('/')
 .patch(protectedRoute,allowedTo('user'),validation(addAddressVal),asyncHandler(addressController.addAddress))
 .get(protectedRoute,allowedTo('user'),asyncHandler(addressController.getLoggedUserAddress))


 addressRouter
 .route('/:id')
 .delete(protectedRoute,allowedTo('admin','user'),validation(addressIdSchema),asyncHandler(addressController.removeFromAddress))



 export default addressRouter
 