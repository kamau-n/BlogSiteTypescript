import { Request, Response, Router } from "express";
import { getRepository } from "typeorm";
import { appDataSource } from "../configuration/connection";
import { News } from "../entity/News";


const newRouter=Router();






newRouter.post("/news",async(req:Request,res:Response)=>{
    console.log("create route has been accessed")
    console.log(req.body)
        

try {
    const news = await appDataSource.createQueryBuilder()
    .insert()
    .into(News)
    .values(req.body)
    .execute()

    res.json({message:"news successfully added"})

   

}
catch(error) {
    console.log("there was an error")
    res.send(error)
}

    }
    )

  
newRouter.delete("/news",async(req:Request,res:Response)=>{

    const news= appDataSource.getRepository(News)
    try {
     await news.delete(1)
     res.send("deleted")

    }
    catch(e){
        res.send("unable to delete")

    }


})

newRouter.get('/news',async(req:Request,res:Response)=>{
    const news= appDataSource.getRepository(News)
    try {
     const data =  await  appDataSource.createQueryBuilder()
     .select("news")
     .from(News,"news")
     .getMany()
     res.send(data)
     console.log(data)
 
    }
    catch(e){
        res.send("there was an error in retrieving the news")
    }


})

newRouter.post('/like',async(req:Request,res:Response)=>{

    console.log(req.body)
    try {

    }
    catch(e){
        console.log("there was an error")
    }

})





export default newRouter;
