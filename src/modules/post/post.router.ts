import express, { NextFunction, Request, Response, Router }  from "express";
import { postController } from "./post.controller";
import {auth as betterAuth} from '../../lib/auth';
import { success } from "better-auth/*";
import { UserRole } from "../../../generated/prisma/enums";

const router = express.Router();


declare global {
    namespace Express {
        interface Request {
            user?: {
                id:string;
                email:string;
                name:string;
                role:string;
                emailVerified:boolean;
            }
    }
}
}
const auth =(...roles:UserRole[])=>{
    return async (req:Request, res:Response, next:NextFunction)=>{
        // get user session
        const session = await betterAuth.api.getSession({
            headers: req.headers as any
        });
        if(!session){
            return res.status(401).json({
                success:false,
                message:"You are not authorized"})
        } 
        if(!session.user.emailVerified){
            return res.status(401).json({
                success:false,
                message:"Email verification required. Please verify your email address"})
        }
        req.user = {
            id:session.user.id,
            email:session.user.email,
            name:session.user.name,
            role:session.user.role as string,
            emailVerified:session.user.emailVerified,
        }
        if(roles.length && !roles.includes(session.user.role as UserRole)){
            return res.status(403).json({
                success:false,
                message:"You do not have permission to access this resource"
            })
        }
        next()

    }
    
}

router.post("/",
     auth(UserRole.USER),
      postController.createPost)

export const postRouter: Router = router;