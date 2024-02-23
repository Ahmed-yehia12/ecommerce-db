import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({

user:{type:Types.ObjectId , ref:'user'},

orderItems:[{
    product:{type:Types.ObjectId , ref:'product'},
    quantity:{
        type:Number , 
    } ,
    price: Number
}],

totalOrederPrice:Number,

shippingAddress:{
    street:String,
    city:String,
    phone:String
},

paymentType:{
    type:String,
    enum:['cash','card'],
    default:'cash'
},
isDelivered:{
    type:Boolean,
    default:false
},
delvieredAt:{
    type:Date
},
isPaid:{
    type:Boolean,
    default:false
},
paidAt:{
    type:Date
}



}, { timestamps: true })


export const orderModel = mongoose.model('order', schema)



