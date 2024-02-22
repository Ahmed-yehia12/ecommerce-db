import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short category name']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    image: String,
    createdBy:{
        type:Types.ObjectId,
        ref:'user'
    }
}, { timestamps: true })


export const categoryModel = mongoose.model('category', schema)



