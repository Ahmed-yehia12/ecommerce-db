
import mongoose from "mongoose"


export const dbConnection =()=>{
    mongoose.connect("mongodb+srv://ahmedyehia:kt814iNF28xwsTd8@cluster0.h8aqkgl.mongodb.net/EcommerceDB")
    .then(()=>{console.log("Db is connected..");})
    .catch((err)=>{console.log("database error",err);})
}