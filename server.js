import express from 'express'
import { dbConnection} from './database/dbConnection.js'
import { bootstrap } from './src/modules/index.routes.js'
import cors from 'cors'
const app = express()
const port = 4000
import dotenv from 'dotenv'

dotenv.config()
await dbConnection()

app.use(cors());

app.use(express.json());
bootstrap(app)
app.use("/uploads",express.static("uploads"))



app.use((error , req , res ,next)=>{
    const statusCode = error.cause || 500
    return res.status(statusCode).json({
        success:false , 
        message:error.message,
        stack: error.stack,
    })
})





app.listen(process.env.PORT||port, () => console.log(`Example app listening on port ${port}!`))