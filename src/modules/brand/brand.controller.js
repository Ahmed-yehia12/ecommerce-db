import slugify from "slugify"
import { brandModel } from './../../../database/models/brand.model.js';
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";



const addBrand= async (req, res , next)=>{

    req.body.slug = slugify(req.body.name)
    req.body.logo = process.env.BASE_URL+ req.file.path
    const brand = new brandModel(req.body)
    await brand.save()
    res.json({success: true , brand})
};

const getAllBrands = async (req, res , next)=>{
    let apiFeatures = new ApiFeatures(brandModel.find(), req.query).fields().pagination().sort().search().filter()

    let brands =   await apiFeatures.mongooseQuery

    res.json({success: true,page:apiFeatures.pageNumber , brands})
};

const getSingleBrand = async (req, res , next)=>{

    const brand = await brandModel.findById(req.params.id)
    !brand && res.status("404").json({success:false , message:"brand not found"})
    brand && res.json({success: true , brand})
};

const updateBrand = async (req, res , next)=>{
    req.body.slug = slugify(req.body.name)
    if(req.file){
        req.body.logo = process.env.BASE_URL+ req.file.path
    }
    const brand = await brandModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    !brand && res.status("404").json({success:false , message:"brand not found"});

    brand&& res.json({success: true , brand})
};

const deleteBrand = deleteOne(brandModel)
export {
    addBrand,
    getAllBrands,
    getSingleBrand,
    updateBrand,
    deleteBrand
}