import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short subCategory name']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    category:{
    type: Types.ObjectId,
    ref:'category'
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'user'
    }
}, { timestamps: true })

schema.pre("find",function(){
   this.populate('category')
})

export const subCategoryModel = mongoose.model('subCategory', schema)



