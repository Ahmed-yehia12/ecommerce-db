import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
    code: {
        type: String,
        trim: true,
        required: true,
       
    },
    expires: {
        type: Date,
    },
    discount:{
        type:Number,
        required:true,
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'user'
    }
}, { timestamps: true })


export const cuponModel = mongoose.model('cupon', schema)



