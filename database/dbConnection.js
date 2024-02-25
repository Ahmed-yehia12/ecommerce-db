
import mongoose from "mongoose"


export const dbConnection =()=>{
    mongoose.connect(process.env.DATABASE_CONNECTION)
    .then(()=>{console.log("Db is connected..");})
    .catch((err)=>{console.log("database error",err);})
}