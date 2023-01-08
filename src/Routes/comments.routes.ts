import { Request, Response, Router } from "express";
import { appDataSource } from "../configuration/connection";
import { Comments } from "../entity/Comment";

const commentRouter =Router()


commentRouter.post("/news/comment",async(req:Request,res:Response)=>{
    console.log(req.body)
   const data ={newsId :1,comment:req.body.comment}
    try {

 const inserted =    await  appDataSource.createQueryBuilder()
        .insert()
        .into(Comments)
        .values(req.body)
        .execute()
     

        
        res.status(200).json({msg:"Comment added successfully"})
        console.log(inserted)


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
                news:true,
                user:true
            },
            where :{
                news:{
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