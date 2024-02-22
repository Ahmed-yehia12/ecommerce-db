import { Router } from "express";
import * as brandsController from './brand.controller.js'
import { asyncHandler } from "../../utils/asyncHandler.js";
import { fileValidation, uploadFile } from "../../utils/multer.js";
import { validation } from "../../middleware/validation.js";
import { brandIdSchema, brandSchema, updateBrandSchema } from "./brand.schema.js";
import { protectedRoute } from './../../middleware/protectedRoutes.js';
import { allowedTo } from './../../middleware/roles.js';


const brandsRouter = Router();

 brandsRouter.route('/')
 .post(protectedRoute,allowedTo('admin'),uploadFile("brandsLogo",fileValidation.images).single("logo"),validation(brandSchema),asyncHandler(brandsController.addBrand))
 .get(asyncHandler(brandsController.getAllBrands))


 brandsRouter.route('/:id')
 .get(validation(brandIdSchema),asyncHandler(brandsController.getSingleBrand))
 .put(protectedRoute,allowedTo('admin'),uploadFile("brandsLogo",fileValidation.images).single("logo"),validation(updateBrandSchema),asyncHandler(brandsController.updateBrand))
 .delete(protectedRoute,allowedTo('admin'),validation(brandIdSchema),asyncHandler(brandsController.deleteBrand))







export default brandsRouter