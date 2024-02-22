import { Router } from "express";

import * as cuponController from './cupon.controller.js'
import { protectedRoute } from "../../middleware/protectedRoutes.js";
import { allowedTo } from "../../middleware/roles.js";
import { validation } from "../../middleware/validation.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { cuponIdSchema, cuponSchema, updateCuponSchema } from "./cupon.schema.js";



 const cuponRouter = Router();

 cuponRouter.use(protectedRoute,allowedTo('user'))
 cuponRouter
 .route('/')
 .post(validation(cuponSchema),asyncHandler(cuponController.addCupon))
 .get(asyncHandler(cuponController.getAllCupons))


 cuponRouter
 .route('/:id')
 .get(validation(cuponIdSchema),asyncHandler(cuponController.getSingleCupon))
 .put(validation(updateCuponSchema),asyncHandler(cuponController.updateCupon))
 .delete(validation(cuponIdSchema),asyncHandler(cuponController.deleteCupon))



 export default cuponRouter
 