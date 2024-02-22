import { Router } from "express";
import { validation } from "../../middleware/validation.js";
import { changePasswordVal, loginSchema, signupSchema } from "./auth.schmea.js";
import * as authController from "./auth.controller.js"
import { checkEmail } from './../../middleware/emailExist.js';
import { asyncHandler } from "../../utils/asyncHandler.js";
import { protectedRoute } from "../../middleware/protectedRoutes.js";



const authRouter = Router()

authRouter.post('/signUp',validation(signupSchema),checkEmail ,asyncHandler(authController.signUp ) );
authRouter.post('/logIn', validation(loginSchema),asyncHandler(authController.logIn) );
authRouter.patch('/changePassword',protectedRoute, validation(changePasswordVal),asyncHandler(authController.changePassword) );



export default authRouter