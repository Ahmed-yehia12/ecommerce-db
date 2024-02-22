import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'title is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short product name'],
        maxlength: [100, 'max title is 100 chars']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true,
        minLength: [10, 'too short product description'],
        maxlength: [500, 'too long product description']
    },
    imgCover:String,
    images:[],
    price:{
        type:Number,
        min: 0 ,
        required:true
    },
    priceAfterDiscount:{
        type:Number,
        min: 0 ,
        required:false
    },
    quantity:{
        type:Number,
        min:0,
        default:0
    },
    sold:Number,
    rateAvg:{
        type:Number,
        max:5,
        min:0
    },

    rateCount:{
        type:Number,
        min:0 
    },
 
    Category:{
    type: Types.ObjectId,
    ref:'category'
    },
    subCategory:{
        type: Types.ObjectId,
        ref:'subCategory'
        },
    brand:{
        type: Types.ObjectId,
        ref:'Brand'
        },
        createdBy:{
            type:Types.ObjectId,
            ref:'user'
        }







}, { timestamps: true ,toJSON: { virtuals: true } })

schema.virtual('myReviews', {
    ref: 'review',
    localField: '_id',
    foreignField: 'product',
  });
  schema.pre('findOne', function(){
    this.populate('myReviews')
})

export const productModel = mongoose.model('product', schema)



