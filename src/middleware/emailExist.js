import { userModel } from "../../database/models/user.model.js"




export const checkEmail = async (req ,res, next)=>{
    let user = await userModel.findOne({email:req.body.email})
    if(user) return next(new Error('email is already exist',{cause:409}))
    next()
}