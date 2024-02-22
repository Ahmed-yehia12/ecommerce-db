import { Router } from "express";

import * as reviewController from './review.controller.js'
import { protectedRoute } from "../../middleware/protectedRoutes.js";
import { allowedTo } from "../../middleware/roles.js";
import { validation } from "../../middleware/validation.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { reviewIdSchema, reviewSchema, updatereviewSchema } from "./review.schema.js";



 const reviewRouter = Router();

 reviewRouter
 .route('/')
 .post(protectedRoute,allowedTo('user'),validation(reviewSchema),asyncHandler(reviewController.addReview))
 .get(asyncHandler(reviewController.getAllReviews))


 reviewRouter
 .route('/:id')
 .get(validation(reviewIdSchema),asyncHandler(reviewController.getSingleReview))
 .put(protectedRoute,allowedTo('user'),validation(updatereviewSchema),asyncHandler(reviewController.updateReview))
 .delete(protectedRoute,allowedTo('admin','user'),validation(reviewIdSchema),asyncHandler(reviewController.deleteReview))



 export default reviewRouter
 