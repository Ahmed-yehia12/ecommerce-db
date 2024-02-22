import slugify from "slugify"
import { productModel } from './../../../database/models/product.model.js';
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";

const addProduct = async (req, res , next)=>{

    req.body.slug = slugify(req.body.title)
    req.body.imgCover =process.env.BASE_URL+ req.files.imgCover[0].path
    const img =  req.files.images
    const photos=[]
    img.map((file)=>{
       photos.push(process.env.BASE_URL+file.path)
     })
     req.body.images = photos
     console.log(req.files);
    const product = new productModel(req.body)
    await product.save()
    res.json({success: true , product})
};

const getAllProducts = async (req, res , next)=>{

  let apiFeatures = new ApiFeatures(productModel.find(), req.query).fields().search().filter().sort().pagination()

  let products =   await apiFeatures.mongooseQuery
    res.json({success: true ,page:apiFeatures.pageNumber, products})
};

const getSingleProduct = async (req, res , next)=>{

    const product = await productModel.findOne({_id:req.params.id})
    !product && res.status("404").json({success:false , message:"product not found"})
    product && res.json({success: true , product})
};

const updateProduct = async (req, res , next)=>{
    req.body.slug = slugify(req.body.title)
    if(req.files){
        req.body.imgCover =process.env.BASE_URL+ req.files.imgCover[0].path
        const img =  req.files.images
        const photos=[]
        img.map((file)=>{
           photos.push(process.env.BASE_URL+file.path)
         })
         req.body.images = photos
    }

    const product = await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    !product && res.status("404").json({success:false , message:"product not found"});

    product&& res.json({success: true , product})
};

const deleteProduct = deleteOne(productModel)

export {
    addProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}