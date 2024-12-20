import express from "express"
import {clerkWebhooks} from "../controllers/UserController.js"

const userRoutes=express.Router()
userRoutes.post("/webhooks",clerkWebhooks)

export default userRoutes