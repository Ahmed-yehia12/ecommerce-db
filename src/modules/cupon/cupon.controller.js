
import { ApiFeatures } from '../../utils/apiFeatures.js';
import { cuponModel } from './../../../database/models/cupon.model.js';


const addCupon = async (req, res , next)=>{

    req.body.user = req.user._id
    let isCupon = await cuponModel.findOne({user:req.user._id })
    if(isCupon) return next(new Error("you already maked a Cupon",{cause:404}))
    const cupon = new cuponModel(req.body)
    await cupon.save()
    res.json({success: true , cupon})
};

const getAllCupons = async (req, res , next)=>{

let apiFeatures = new ApiFeatures(cuponModel.find({}), req.query).fields().search().filter().sort().pagination()

    const cupons = await  apiFeatures.mongooseQuery
    res.json({success: true ,page:apiFeatures.pageNumber, cupons})
};

const getSingleCupon = async (req, res , next)=>{

    const cupon = await cuponModel.findById(req.params.id)
    !cupon && res.status("404").json({success:false , message:"cupon not found"})
    cupon && res.json({success: true , cupon})
};

const updateCupon = async (req, res , next)=>{
    const cupon = await cuponModel.findOneAndUpdate({_id:req.params.id},req.body,{new:true});
    !cupon && res.status("404").json({success:false , message:"cupon not found"});

    cupon&& res.json({success: true , cupon})
};

const deleteCupon =async (req, res , next)=>{
 
    const document = await cuponModel.findOneAndDelete({_id:req.params.id })
    !document && res.status("404").json({success:false , message:"document not found"});

    document&& res.json({success: true , document})
};

export {
    addCupon,
    getAllCupons,
    getSingleCupon,
    updateCupon,
    deleteCupon
}