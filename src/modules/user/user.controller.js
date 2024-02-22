import { deleteOne } from "../handlers/handlers.js";
import { userModel } from './../../../database/models/user.model.js';
import jwt from 'jsonwebtoken'



const addUser = async (req, res , next)=>{
 
    
    const user = new userModel(req.body)
    await user.save()

    res.json({success: true , user })
};

const getAllUsers = async (req, res , next)=>{

    const user = await userModel.find()
    res.json({success: true , user})
};

const getSingleUser = async (req, res , next)=>{

    const user = await userModel.findById(req.params.id)
    !user && res.status("404").json({success:false , message:"user not found"})
    user && res.json({success: true , user})
};

const updateUser = async (req, res , next)=>{
    const user = await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    !user && res.status("404").json({success:false , message:"user not found"});

    user&& res.json({success: true , user})
};

const deleteUser= deleteOne(userModel)

export {
  addUser , 
  getAllUsers,
  getSingleUser,
  updateUser,
deleteUser
}