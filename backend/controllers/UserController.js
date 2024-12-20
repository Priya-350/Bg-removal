import {Webhook} from "svix"
import UserModel from "../models/UserModel.js"

const clerkWebhooks=async(req,res)=>{
    try{
         const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET)
         await whook.verify(JSON.stringify(req,body),{
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"]

         })

         const {data,type}=req.body
         switch(type){
            case "user.created":{
               const UserData={
                clerkid:data.id,
                email:data.email_addresses[0].email_address,
                photo:data.image_url,
                firstname:data.first_name,
                lastname:data.last_name

               }
               await UserModel.create(UserData)
               res.json({})

                break;
            }
                case "user.updated":{
                    const UserData={
                       
                        email:data.email_addresses[0].email_address,
                        photo:data.image_url,
                        firstname:data.first_name,
                        lastname:data.last_name
        
                       }
                       await UserModel.findOneAndUpdate({ clerkid:data.id} ,UserData)
                       res.json({})

                    break;

                }
                
                    case "user.deleted":{
                     await UserModel.findOneAndDelete({ clerkid:data.id})
                     res.json({})

                    }
                        
                        default:
                            break;

         }
    }
    catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}
export {clerkWebhooks} 