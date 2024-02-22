import { Router } from "express";
import * as userController from './user.controller.js'
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validation } from "../../middleware/validation.js";
import {addUserVal,updateUserVal,userIdSchema } from "./user.schema.js";
import { checkEmail } from "../../middleware/emailExist.js";
import { protectedRoute } from "../../middleware/protectedRoutes.js";
import { allowedTo } from "../../middleware/roles.js";


 const userRouter = Router({mergeParams:true});

 userRouter
 .route('/')
 .post(protectedRoute,allowedTo('admin'),validation(addUserVal),checkEmail,asyncHandler(userController.addUser))
 .get(protectedRoute,allowedTo('admin'),asyncHandler(userController.getAllUsers))


 userRouter
 .route('/:id')
 .get(validation(userIdSchema),asyncHandler(userController.getSingleUser))
 .put(protectedRoute,allowedTo('admin'),validation(updateUserVal),asyncHandler(userController.updateUser))
 .delete(protectedRoute,allowedTo('admin'),validation(userIdSchema),asyncHandler(userController.deleteUser))



 export default userRouter
 