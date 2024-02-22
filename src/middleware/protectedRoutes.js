import { userModel } from "../../database/models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt, { decode } from "jsonwebtoken";

export const protectedRoute=asyncHandler(
    async(req , res ,next)=>{

        let {token} = req.headers
    
        if(!token) return next(new Error("token not provided",{cause:401}))
    
        let decoded = jwt.verify(token , process.env.TOKEN_SECRET)
    
        const user = await userModel.findById(decoded.userId)
        if(!user) return next(new Error("user not found",{cause:401}))
    
        if(user.passwordChangedAt){
            let time = parseInt(user?.passwordChangedAt.getTime() / 1000)
    
            if (time > decode.iat) return next(new Error("invalid token .. login again"))
            console.log(time+"|"+decoded.iat);
        }
      
      
           req.user =user
        next()
        
        }
)
