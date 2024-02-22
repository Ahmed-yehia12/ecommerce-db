import { Router } from "express";
import * as categoryController from './category.controller.js'

import { asyncHandler } from "../../utils/asyncHandler.js";
import { fileValidation, uploadFile } from "../../utils/multer.js";
import { validation } from "../../middleware/validation.js";
import { categoryIdSchema, categorySchema, updateCategorySchema } from "./category.schema.js";
import subCategoryRouter from './../subcategory/subcategory.routes.js';
import { protectedRoute } from "../../middleware/protectedRoutes.js";
import { allowedTo } from "../../middleware/roles.js";


 const categoryRouter = Router();

 categoryRouter.use('/:category/subcategories',subCategoryRouter)

 categoryRouter.route('/')
 .post(protectedRoute,allowedTo('admin'),uploadFile("categoryImages",fileValidation.images).single("image"),validation(categorySchema) ,asyncHandler(categoryController.addCategory))
 .get(asyncHandler(categoryController.getAllCategories))


 categoryRouter.route('/:id')
 .get(validation(categoryIdSchema),asyncHandler(categoryController.getSingleCategory))
 .put(protectedRoute,allowedTo('admin'),uploadFile("categoryImages",fileValidation.images).single("image"),validation(updateCategorySchema) ,asyncHandler(categoryController.updateCategory))
 .delete(protectedRoute,allowedTo('admin'),validation(categoryIdSchema),asyncHandler(categoryController.deleteCategory))



 export default categoryRouter