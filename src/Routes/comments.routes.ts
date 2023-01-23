import { NextFunction, Request, Response, Router } from "express";
import { appDataSource } from "../configuration/connection";
import { Comments } from "../entity/Comment";
import jwt, { Secret } from "jsonwebtoken";
import { getCookie, setCookie } from 'typescript-cookie'

import sessionMiddleware from "../middleware/expressSession";



const secret:Secret="i have a secret";
//const accessToken:string=''

// const verifyJwt =(req:Request,res:Response,next:NextFunction)=>{

//     //console.log("middleware has been accessed")
//     //console.log(getCookie('acessToken'));
//     // let token =req.headers.authorization?.split(' ')[1];

//     const { acessToken} =req.cookies;
//     console.log(acessToken)
   
// //    const token =res.cookie.accessToken || res.cookie.refreshToken;
// //     if(token) {
// //      const decoded=   jwt.verify(token,secret)
// //      next()
        
        
// //     }
// //     else{
// //         res.status(401).json({msg:"the authentication failed"})
// //         next()
// //     }

// next()
// }



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
commentRouter.post("/news/comments", async (req:Request,res:Response)=>{
    console.log(req.body)

    const commentsRepository=  appDataSource.getRepository(Comments)
    try {
   const comments =await commentsRepository.find(
        {
            relations:{
                blogs:true,
                user:true
            },
            where :{
                blogs:{
                    id:req.body.id
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