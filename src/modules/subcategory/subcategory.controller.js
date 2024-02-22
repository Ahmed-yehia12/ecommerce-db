import slugify from "slugify"
import { subCategoryModel } from './../../../database/models/subCategory.model.js';
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";


const addSubCategory = async (req, res , next)=>{

    req.body.slug = slugify(req.body.name)
    const subCategory = new subCategoryModel(req.body)
    await subCategory.save()
    res.json({success: true , subCategory})
};

const getAllSubCategories = async (req, res , next)=>{

    let filterOpj = {}
if(req.params.category){
    filterOpj.category = req.params.category
}

let apiFeatures = new ApiFeatures(subCategoryModel.find(filterOpj), req.query).fields().search().filter().sort().pagination()

    const subCategory = await  apiFeatures.mongooseQuery
    res.json({success: true ,page:apiFeatures.pageNumber, subCategory})
};

const getSingleSubCategory = async (req, res , next)=>{

    const subCategory = await subCategoryModel.findById(req.params.id)
    !subCategory && res.status("404").json({success:false , message:"subCategory not found"})
    subCategory && res.json({success: true , subCategory})
};

const updateSubCategory = async (req, res , next)=>{
    req.body.slug = slugify(req.body.name)
    const subCategory = await subCategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    !subCategory && res.status("404").json({success:false , message:"subCategory not found"});

    subCategory&& res.json({success: true , subCategory})
};

const deleteSubCategory = deleteOne(subCategoryModel)

export {
    addSubCategory,
    getAllSubCategories,
    getSingleSubCategory,
    updateSubCategory,
    deleteSubCategory
}