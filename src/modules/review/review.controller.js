
import { ApiFeatures } from '../../utils/apiFeatures.js';
import { reviewModel } from './../../../database/models/review.model.js';


const addReview = async (req, res , next)=>{

    req.body.user = req.user._id
    let isReview = await reviewModel.findOne({user:req.user._id , product:req.body.product})
    if(isReview) return next(new Error("you already maked a review",{cause:404}))
    const review = new reviewModel(req.body)
    await review.save()
    res.json({success: true , review})
};

const getAllReviews = async (req, res , next)=>{

let apiFeatures = new ApiFeatures(reviewModel.find({}), req.query).fields().search().filter().sort().pagination()

    const review = await  apiFeatures.mongooseQuery
    res.json({success: true ,page:apiFeatures.pageNumber, review})
};

const getSingleReview = async (req, res , next)=>{

    const review = await reviewModel.findById(req.params.id)
    !review && res.status("404").json({success:false , message:"review not found"})
    review && res.json({success: true , review})
};

const updateReview = async (req, res , next)=>{
    const review = await reviewModel.findOneAndUpdate({_id:req.params.id,user:req.user._id},req.body,{new:true});
    !review && res.status("404").json({success:false , message:"review not found"});

    review&& res.json({success: true , review})
};

const deleteReview =async (req, res , next)=>{
 
    const document = await reviewModel.findOneAndDelete({_id:req.params.id ,user:req.user._id})
    !document && res.status("404").json({success:false , message:"document not found"});

    document&& res.json({success: true , document})
};

export {
    addReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
}