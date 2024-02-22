import { Router } from "express";

import * as subCategoryController from './subcategory.controller.js'
import { get } from "mongoose";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validation } from "../../middleware/validation.js";
import { subCategoryIdSchema, subCategorySchema, updateSubCategorySchema } from "./subCategory.schema.js";
import { protectedRoute } from "../../middleware/protectedRoutes.js";
import { allowedTo } from "../../middleware/roles.js";

 const subCategoryRouter = Router({mergeParams:true});

 subCategoryRouter
 .route('/')
 .post(protectedRoute,allowedTo('admin'),validation(subCategorySchema),asyncHandler(subCategoryController.addSubCategory))
 .get(asyncHandler(subCategoryController.getAllSubCategories))


 subCategoryRouter
 .route('/:id')
 .get(validation(subCategoryIdSchema),asyncHandler(subCategoryController.getSingleSubCategory))
 .put(protectedRoute,allowedTo('admin'),validation(updateSubCategorySchema),asyncHandler(subCategoryController.updateSubCategory))
 .delete(protectedRoute,allowedTo('admin'),validation(subCategoryIdSchema),asyncHandler(subCategoryController.deleteSubCategory))



 export default subCategoryRouter
 