

import { cartModel } from '../../../database/models/cart.model.js';
import { orderModel } from '../../../database/models/order.model.js';
import { productModel } from './../../../database/models/product.model.js';
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51OmShNHRFfpX6hm3cVr3Keb28EWnW4r5GL2MmPSAcIsnMZvQ7mctEIoufEZH7Y0Q1bOQWrod7PyOYXY2mA6mNnPh001fX8FWG4');

const createCashOrder = async (req,res,next)=>{

    // get cart 
    const cart = await cartModel.findById(req.params.id);
    if(!cart) return next(new Error('cart not found',{cause:404}));



    //  calc total order price 
    let totalOrederPrice = cart.totalPriceAfterDiscount?cart.totalPriceAfterDiscount:cart.totalPrice

    // create order
    let order = new orderModel({
        user:req.user._id ,
        orderItems:cart.cartItems,
        totalOrederPrice,
        shippingAddress:req.body
    })
    await order.save()
    // increment sold & decrement quantity
    let options = cart.cartItems.map((pro)=>{

        return(
            { updateOne : {
                "filter" : { _id: pro.product }, 
                "update" : { $inc : { sold:pro.quantity , quantity:-pro.quantity } }
             } }

        )
    })
    productModel.bulkWrite(options);

    // clear user cart

    await cartModel.findByIdAndDelete(req.params.id )




 res.json({success:true , order})

}

const getLoggedUserOrder = async (req,res,next)=>{

    const order = await orderModel.find({user:req.user._id}).populate('orderItems.product')
    if(!order) return next(new Error(`you don't have eny orders`, {cause:404}))
    res.json({success:true , order})
}


const getAllOrder = async (req,res,next)=>{
    const order = await orderModel.find().populate('orderItems.product')
    if(!order) return next(new Error(`you don't have eny orders`, {cause:404}))
    res.json({success:true , order})
}



const createCheckOutSession = async(req,res,next)=>{
    const cart = await cartModel.findById(req.params.id);
    if(!cart) return next(new Error('cart not found',{cause:404}));



    //  calc total order price 
    let totalOrederPrice = cart.totalPriceAfterDiscount?cart.totalPriceAfterDiscount:cart.totalPrice

    let session = await stripe.checkout.sessions.create({
        line_items:[
            {
                price_data:{
                    currency:'egp',
                    unit_amount: totalOrederPrice * 100,
                    product_data:{
                        name: req.user.name
                    }
                },
                quantity:1
            }
        ],
        mode:'payment',
        success_url:"https://ahmed-yehia12.github.io/E-CommerceReactJs/",
        cancel_url:"https://ahmed-yehia12.github.io/E-CommerceReactJs/#/cart",
        // user email
        customer_email:req.user.email,
        //  cart id 
        client_reference_id:req.params.id,
        metadata: req.body.shippingAddress
    })

    res.json({success:true , session})

}





export {
    createCashOrder,
    getLoggedUserOrder,
    getAllOrder,
    createCheckOutSession
}