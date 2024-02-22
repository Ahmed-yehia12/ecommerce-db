
import { userModel } from '../../../database/models/user.model.js';
import { ApiFeatures } from '../../utils/apiFeatures.js';


const addToWishList = async (req, res , next)=>{
    const wishList = await userModel.findByIdAndUpdate(req.user._id,{$addToSet:{wishList:req.body.product}},{new:true}).populate('wishList');
    !wishList && res.status("404").json({success:false , message:"wishList not found"});

    wishList&& res.json({success: true , wishList:wishList.wishList})
};


const removeFromWishList = async (req, res , next)=>{
    const wishList = await userModel.findByIdAndUpdate(req.user._id,{$pull:{wishList:req.params.id}},{new:true}).populate('wishList');
    !wishList && res.status("404").json({success:false , message:"wishList not found"});

    wishList&& res.json({success: true , wishList:wishList.wishList})
};


const getLoggedUserWishList = async (req, res , next)=>{
    const {wishList} = await userModel.findById(req.user._id).populate('wishList')
    !wishList && res.status("404").json({success:false , message:"wishList not found"});

    wishList&& res.json({success: true , wishList})
};



export {
    addToWishList,
    removeFromWishList,
    getLoggedUserWishList
}