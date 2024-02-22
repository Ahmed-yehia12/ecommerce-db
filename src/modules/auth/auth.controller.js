
import jwt from "jsonwebtoken";
import { userModel } from './../../../database/models/user.model.js';
import bcrypt from 'bcryptjs'
import { asyncHandler } from "../../utils/asyncHandler.js";

export const signUp = async(req , res, next)=>{
 

    const user = new userModel(req.body)
    await user.save()

    const token = jwt.sign({userId: user._id , role:user.role}, process.env.TOKEN_SECRET);
 
   res.json({success:true, message:"user created successfuly" ,user,token})


};
export const logIn= async(req , res ,next)=>{

    const {email} = req.body;
    const isUser = await userModel.findOne({email});
    if(!isUser) return next(new Error("Email is invalid")) 

  
    const match = bcrypt.compareSync(req.body.password , isUser.password)
    if(!match) return next(new Error("password is invalid"))
    

    const token =jwt.sign({userId: isUser._id , role:isUser.role},process.env.TOKEN_SECRET)
    res.json({success:true , token})

}



export const changePassword= async(req , res ,next)=>{

let user = await userModel.findById(req.user._id)

if(!user) return next(new Error("user not found"))

    const match = bcrypt.compareSync(req.body.password , user.password)
    if(!match) return next(new Error("password is invalid"))
    const token =jwt.sign({userId: user._id , role:user.role},process.env.TOKEN_SECRET)
    await userModel.findByIdAndUpdate(req.user._id,{password:req.body.newPassword , passwordChangedAt:Date.now()})
    res.json({success:true , token})

}





