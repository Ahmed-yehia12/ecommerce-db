import slugify from "slugify"
import { categoryModel } from './../../../database/models/category.model.js';
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from './../../utils/apiFeatures.js';

const addCategory = async (req, res , next)=>{
    console.log(req.body);
    req.body.slug = slugify(req.body.name)
    req.body.image =process.env.BASE_URL+ req.file.path
    
    const category = new categoryModel(req.body)
    await category.save()
    res.json({success: true , category})
};

const getAllCategories = async (req, res , next)=>{

    let apiFeatures = new ApiFeatures(categoryModel.find(), req.query).fields().pagination().sort().search().filter()

    let categories =   await apiFeatures.mongooseQuery
  
    res.json({success: true,page:apiFeatures.pageNumber , categories})
};

const getSingleCategory = async (req, res , next)=>{

    const category = await categoryModel.findById(req.params.id)
    !category && res.status("404").json({success:false , message:"category not found"})
    category && res.json({success: true , category})
};

const updateCategory = async (req, res , next)=>{
    req.body.slug = slugify(req.body.name)
    if(req.file){
        req.body.image =process.env.BASE_URL+ req.file.path

    }
    const category = await categoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    !category && res.status("404").json({success:false , message:"category not found"});

    category&& res.json({success: true , category})
};

const deleteCategory = deleteOne(categoryModel)

export {
    addCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
}