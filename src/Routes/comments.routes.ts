import { NextFunction, Request, Response, Router } from "express";
import { appDataSource } from "../configuration/connection";
import { Comments } from "../entity/Comment";
import jwt, { Secret } from "jsonwebtoken";
import { getCookie, setCookie } from 'typescript-cookie'

import sessionMiddleware from "../middleware/expressSession";
import verifyJwt from "../middleware/jwtVerify";
import { User } from "../entity/User";





const commentRouter =Router()


commentRouter.post("/blog/comment",async(req:Request,res:Response)=>{
 console.log(req.body)

    try {

 const inserted =    await  appDataSource.createQueryBuilder()
        .insert()
        .into(Comments)
        .values(req.body)
        .execute()
        res.status(200).json({msg:"Comment added successfully",added:true})
       // console.log(inserted)


    }
    catch(e) {
        res.status(200).json({msg:"Comment not added"})
        console.log(e)

    }
})
commentRouter.post("/blog/comments", async (req:Request,res:Response)=>{
    console.log(req.body)

    const commentsRepository=  appDataSource.getRepository(Comments)
    try {
   const comments =await commentsRepository.find(
        {
            relations:{
                
                blogs:true,
                user:true
            },
            where : {
            blogs: {
                      id:req.body.blogsId
            
            
        }

    
    }
}
    )

    res.send(comments)

    }
    catch(err) {
        res.send(err)
    }





})

export default commentRouter;