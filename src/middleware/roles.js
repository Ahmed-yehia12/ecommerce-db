import { asyncHandler } from "../utils/asyncHandler.js"

export const allowedTo = (...roles)=>{

    return asyncHandler( async(req , res ,next)=>{
    
       if(!roles.includes(req.user.role)) return next(new Error("you are not authraized",{cause:401}))
    
       next()
        
        } )
    } 