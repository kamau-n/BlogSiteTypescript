import {  Request, Response, Router } from "express";
import { getRepository } from "typeorm";
import { appDataSource } from "../configuration/connection";
import { Likes } from "../entity/Likes";
import { Blog } from "../entity/Blog";

//import multerUpload  from "../middleware/multerUpload";
import multer from "multer";





const newRouter = Router();

const storage = multer.diskStorage({

  destination: function (req:Request, file, cb) {

    cb(null, "/harry/Developer/Projects/news_app/src/uploads");
    console.log("i have been accessed")
  },
  filename: function (req:Request, file, cb) {
    
    cb(null,  file.originalname);
    console.log(file)

    let _new_name = Date.now() + "-" + file.originalname
    return _new_name;
    
    //req.file_name= Date.now() + "-" + file.originalname
  },
});





// creating a new blog article
newRouter.post("/blogs", (req:Request , res: Response) => {
  
   console.log("create route has been accessed");
   console.log(req.body)


   let upload = multer({storage:storage}).single("image");
   upload(req,res,(err)=>{
    if(err) {
      res.json({message:"unable to upload an image",created:false})
    }
    else {
    
    const news =  appDataSource
      .createQueryBuilder()
      .insert()
      .into(Blog)
      .values(req.body)
      .execute();

      news.then((res_message)=>{
        console.log(res_message)
        
        res.json({ message: "blog successfully added",created:true });
        console.log("blog created successfully")

      })
      .catch((err)=>{
        console.log("there was an error" + err)

        res.status(200).json({created:false,msg:"Unable to create the news Article"});
      

      })
  
    }
 
  

    
    })
  




})




//  Getting all the blog articles


newRouter.get("/blogs", async (req: Request, res: Response) => {


  
  const blogsRepository = appDataSource.getRepository(Blog);
  console.log("the blogs route has been accessed")
  try {
   const blogs = await blogsRepository.find({
      relations:{
        user:true,
        likes:true
      }
      
    })


    // const data = await appDataSource
    //   .createQueryBuilder()
    //   .select("blog")
    //   .from(Blog, "blog")
    //   .getMany()
    res.status(200).json(blogs);
    //console.log(blogs)
  } catch (e) {
    res.send("there was an error in retrieving the news");
    console.log(e)
  }

});


newRouter.get("/blog/:id", async (req, res) => {
  console.log(req.params.id);

  const newsRepository = appDataSource.getRepository(Blog);

  try {
    const article = await appDataSource
      .createQueryBuilder()
      .select()
      .from(Blog, "article")
      .where("id=:news_id", { news_id: req.params.id })
      .execute();

    res.send(article);
  } catch (err) {
    res.json({ msg: "there was an error in the retrival of the information" });
  }
});



//delete a  blog

newRouter.get("/blog/delete/:id", async (req: Request, res: Response) => {
  console.log(req.params.id)
  const blogs = appDataSource.getRepository(Blog);
  try {
    await blogs.delete(req.params.id);
    res.json({msg:"Blog deleted Successfully",deleted:true});
  } catch (e) {
    res.json({msg:"unable to delete the blog" ,deleted:false})
  }
});




// getting the new article by topic 


newRouter.post("/blog/topic",async(req,res)=>{
  console.log(req.body)
  const topic =req.body.topic;

  const news = appDataSource.getRepository(Blog);

  try {
    const blogs = await news.find(
    
      {
        
        where:{
          topic:topic
        }
        ,relations:{
          user:true
        }
        
      }
      )

    
    res.status(200).json({available:true ,blogs});
    console.log(blogs)
      // }
  } catch (e) {
    res.send("there was an error in retrieving the news");
  }
});

  





 
  //this is a route for liking a news article



 
newRouter.post("/blog/like", async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const likes = await appDataSource
      .createQueryBuilder()
      .insert()
      .into(Likes)
      .values(req.body)
      .execute();

  

//   const blogsRepository=  appDataSource.getRepository(Blog)
//   try {
//  const blogs =await blogsRepository.find(
//       {
//           relations:{
            
//               users:true
//           }
        
//       }
  

  res.status(200).json({msg:"blog was liked successfully"})

  } catch (e) {
    console.log(e)
    res.json({ msg: "unable to like the post" });
  }
});


/*

getting blogs by user id





*/
newRouter.get("/blogs/user/:id",async(req:Request,res:Response)=>{

  const newsRepository = appDataSource.getRepository(Blog);

  try {
    const article = await appDataSource
      .createQueryBuilder()
      .select()
      .from(Blog, "article")
      .where("userId=:user_id", { user_id: req.params.id })
      .execute();

    res.send(article);
  } catch (err) {
    res.json({ msg: "there was an error in the retrival of the information" });
  }

})





newRouter.post("/blog/likes", async (req: Request, res: Response) => {
  console.log("route has been accessed");
  const blogLikes = appDataSource.getRepository(Likes);

  try {
    const likes = await blogLikes
      .createQueryBuilder()
      .addSelect("COUNT(*)", "likes")
      .where("Likes.blogsId=:id", { id: req.body.blogsId })
      .getRawOne();

    res.send(likes.likes);
  } catch (err) {
    res.send(err);
  }
});

export default newRouter;
