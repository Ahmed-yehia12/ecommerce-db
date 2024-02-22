

import { cartModel } from '../../../database/models/cart.model.js';
import { productModel } from '../../../database/models/product.model.js';
import { ApiFeatures } from '../../utils/apiFeatures.js';
import { cuponModel } from './../../../database/models/cupon.model.js';



const calcPrice = (cart)=>{
    let totalPrice = 0;
    cart.cartItems.forEach((item)=>{
     totalPrice+=item.quantity*item.price
    });
    cart.totalPrice = totalPrice
    if(cart.discount){
        let totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * cart.discount)/100
        cart.totalPriceAfterDiscount = totalPriceAfterDiscount
    }
}

const addToCart = async (req, res , next)=>{

    const product = await productModel.findById(req.body.product)
    if(!product) return next(new Error('product noy found',{cause:404}))
    if(req.body.quantity> product.quantity) return next(new Error('this quantity overd product quantity '))

req.body.price = product.price
    let isCartExist = await cartModel.findOne({user:req.user._id});
    if(!isCartExist){
        const cart =  new cartModel({
            user:req.user._id,
            cartItems: [req.body],
        })
        calcPrice(cart)
        await cart.save()

        cart&& res.json({success: true , cart})
    }else{


       let item =  isCartExist.cartItems.find((item)=>item.product == req.body.product)
       if(item){
        if(item.quantity >= product.quantity ) return next(new Error('this quantity overd product quantity '))
        item.quantity += req.body.quantity || 1
       } 
       else isCartExist.cartItems.push(req.body);
    
       calcPrice(isCartExist)
   
       await isCartExist.save()

        res.json({success:"true", cart:isCartExist})
    }
    
   
};


const removeFromCart= async (req, res , next)=>{
    const cart= await cartModel.findOneAndUpdate({user:req.user._id},{ $pull: {cartItems:{_id:req.params.id}}},{new:true});
    console.log(cart);
    calcPrice(cart)
    await cart.save()
    !cart&& res.status("404").json({success:false , message:"cart not found"});
    cart&& res.json({success: true , cart:cart.cartItems})
};


const updateCartQuantity= async (req, res , next)=>{
    const cart= await cartModel.findOne({user:req.user._id});
    !cart&& res.status("404").json({success:false , message:"cart not found"});

    let item = cart.cartItems.find(item=>item._id==req.params.id);
    if(!item) return next(new Error("item not found",{cause:404}))
    const product = await productModel.findById(item.product)
    if(!product) return next(new Error('product noy found',{cause:404}))
    if(req.body.quantity> product.quantity) return next(new Error('this quantity overd product quantity '))
    item.quantity = req.body.quantity
 
    calcPrice(cart)
    await cart.save()
    cart&& res.json({success: true , cart:cart})
};


const getLoggedUserCart = async (req, res , next)=>{
    const cart = await cartModel.findOne({user:req.user._id}).populate('cartItems.product')
    !cart && res.status("404").json({success:false , message:"Cart not found"});

   
    cart&& res.json({success: true , cart})
};


const clearUserCart = async (req, res , next)=>{
    const cart = await cartModel.findOneAndDelete({user:req.user._id})
    !cart && res.status("404").json({success:false , message:"Cart not found"});

   
    cart&& res.json({success: true , cart})
};


const applyCupon = async(req,res,next)=>{

    const cupon= await cuponModel.findOne({code:req.body.cupon,expires:{$gte:Date.now()}});
    if(!cupon) return next(new Error('invalid cupon',{cause:401}));

    const cart = await cartModel.findOne({user:req.user._id})
    if(!cart) return next(new Error('cart not found'),{cause:404});
    cart.discount = cupon.discount

    calcPrice(cart)
    await cart.save()

    res.json({success:true , cart})


}


export {
addToCart,
removeFromCart,
updateCartQuantity,
getLoggedUserCart,
clearUserCart,
applyCupon
}