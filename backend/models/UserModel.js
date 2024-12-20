import mongoose from "mongoose"

const UserSchema=new mongoose.Schema(
    {
        clerkid:{type:String,required:true,unique:true},
        email:{type:String,required:true,unique:true},
        photo:{type:String,required:true},
        firstname:{type:String},
        lastname:{type:String},
        creditbalance:{type:Number,default:5}
    }
)

const UserModel=mongoose.model("users",UserSchema)
export default UserModel
