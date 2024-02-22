
import { userModel } from '../../../database/models/user.model.js';
import { ApiFeatures } from '../../utils/apiFeatures.js';


const addAddress = async (req, res , next)=>{
    const address = await userModel.findByIdAndUpdate(req.user._id,{$push:{addresses:req.body}},{new:true});
    !address && res.status("404").json({success:false , message:"address not found"});

    address&& res.json({success: true , address:address.addresses})
};


const removeFromAddress= async (req, res , next)=>{
    const address= await userModel.findByIdAndUpdate(req.user._id,{ $pull: {addresses:{_id:req.params.id}}},{new:true});
    console.log(address);

    !address&& res.status("404").json({success:false , message:"address not found"});
    address&& res.json({success: true , adderss:address.addresses})
};


const getLoggedUserAddress = async (req, res , next)=>{
    const {addresses} = await userModel.findById(req.user._id).populate('addresses')
    !addresses && res.status("404").json({success:false , message:"address not found"});

    addresses&& res.json({success: true , addresses})
};



export {
addAddress,
removeFromAddress,
getLoggedUserAddress
}