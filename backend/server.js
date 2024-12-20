import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import "dotenv/config"
import userRoutes from "./routes/UserRoutes.js"
await mongoose.connect(`${process.env.MONGODB_URI}/bg-removal`)
  .then(() => {
    console.log("mongodb is connected..")
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const PORT=process.env.PORT||4000
const app=express()
app.use(express.json())
app.use(cors());
  

app.get("/",(req,res)=>{
    res.send("api is working...")
})
app.use("/api/user",userRoutes)

app.listen(PORT,()=>{
    console.log("server is running on port "+PORT)
})
