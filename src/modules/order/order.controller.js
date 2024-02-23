

import { cartModel } from '../../../database/models/cart.model.js';
import { orderModel } from '../../../database/models/order.model.js';
import { productModel } from './../../../database/models/product.model.js';
import Stripe from 'stripe';
import { userModel } from './../../../database/models/user.model';
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
        shippingAddress:req.body.shippingAddress
    })
    await order.save()
    // increment sold & decrement quantity
    let options = cart.cartItems.map((pro)=>{
    // bulkwrite ....
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

const createOnlinePayment =  (request, response) => {
    const sig = request.headers['stripe-signature'].toString();
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, "whsec_kc6q3lpjr3184KNlE4TcjV60h1rY9Gob");
    } catch (err) {
        return response.status(400).send(`Webhook Error: ${err.message}`);
    
    }
  
    // Handle the event
    if(event.type =='checkout.session.completed'){
        card(event.data.object,response)
        console.log("create order here...");


    }else{
        console.log(`Unhandled event type ${event.type}`);
    }
   
  }



export {
    createCashOrder,
    getLoggedUserOrder,
    getAllOrder,
    createCheckOutSession,
    createOnlinePayment
}

async function card(e,res){

    
    // get cart 
    const cart = await cartModel.findById(e.client_reference_id);
    if(!cart) return next(new Error('cart not found',{cause:404}));

    let user = await userModel.findOne({email:e.customer_email});



   

    // create order
    let order = new orderModel({
        user:user._id ,
        orderItems:cart.cartItems,
        totalOrederPrice:e.amount_total / 100,
        shippingAddress:e.metadata,
        isPaid:true,
        paymentType:'card',
        paidAt:Date.now()
    })
    await order.save()
    // increment sold & decrement quantity
    let options = cart.cartItems.map((pro)=>{
    // bulkwrite ....
        return(
            { updateOne : {
                "filter" : { _id: pro.product }, 
                "update" : { $inc : { sold:pro.quantity , quantity:-pro.quantity } }
             } }

        )
    })
    productModel.bulkWrite(options);

    // clear user cart

    await cartModel.findByIdAndDelete({user:user._id} )
   return res.json({success:true , order})
}