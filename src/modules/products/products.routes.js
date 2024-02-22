import { Router } from "express";
import * as productController from './products.controller.js'
import { fileValidation, uploadFile } from "../../utils/multer.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validation } from "../../middleware/validation.js";
import { productIdSchema, productSchema, updateSchema } from "./product.schema.js";
import { protectedRoute } from "../../middleware/protectedRoutes.js";
import { allowedTo } from "../../middleware/roles.js";
const productRouter = Router()


productRouter.route('/')
 .post(protectedRoute,allowedTo('admin'),uploadFile("productImage", fileValidation.images).fields([{name:"imgCover",maxCount:1},{name:"images",maxCount:6}]),validation(productSchema) ,asyncHandler(productController.addProduct))
 .get(asyncHandler(productController.getAllProducts))


 productRouter.route('/:id')
 .get(validation(productIdSchema),asyncHandler(productController.getSingleProduct))
 .put(protectedRoute,allowedTo('admin'),uploadFile("productImage", fileValidation.images).fields([{name:"imgCover",maxCount:1},{name:"images",maxCount:6}]),validation(updateSchema),asyncHandler(productController.updateProduct))
 .delete(protectedRoute,allowedTo('admin'),validation(productIdSchema),asyncHandler(productController.deleteProduct))




export default productRouter