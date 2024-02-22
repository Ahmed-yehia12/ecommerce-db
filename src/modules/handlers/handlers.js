

export const deleteOne =(model)=>{

    return async (req, res , next)=>{
 
        const document = await model.findByIdAndDelete(req.params.id)
        !document && res.status("404").json({success:false , message:"document not found"});
    
        document&& res.json({success: true , document})
    };
}