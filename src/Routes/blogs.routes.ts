import { Request, Response, Router } from "express";
import { getRepository } from "typeorm";
import { appDataSource } from "../configuration/connection";
import { Likes } from "../entity/Likes";
import { Blog } from "../entity/Blog";
import verifyJwt from "../middleware/jwtVerify";

const newRouter = Router();


// creating a new blog article
newRouter.post("/blogs", async (req: Request, res: Response) => {
   console.log("create route has been accessed");
  // console.log(req.body);

  try {
    const news = await appDataSource
      .createQueryBuilder()
      .insert()
      .into(Blog)
      .values(req.body)
      .execute();

    res.json({ message: "news successfully added",created:true });
  } catch (error) {
    console.log("there was an error" + error);

    res.status(200).json({created:false,msg:"Unable to create the news Article"});
  }
});


//  Getting all the blog articles


newRouter.get("/blogs", async (req: Request, res: Response) => {
  const blogsRepository = appDataSource.getRepository(Blog);
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

newRouter.delete("/blog", async (req: Request, res: Response) => {
  const blogs = appDataSource.getRepository(Blog);
  try {
    await blogs.delete(1);
    res.send("deleted");
  } catch (e) {
    res.send("unable to delete");
  }
});




// getting the new article by topic 


newRouter.post("/blog/topic",async(req,res)=>{
  console.log(req.body)
  const topic =req.body.topic;

  const news = appDataSource.getRepository(Blog);
  try {

    const data = await appDataSource
      .createQueryBuilder()
      .select()
      .from(Blog, "blogs")
      .where("topic=:topic", { topic: topic })

      .execute();


      if(data.length ==0) {
        res.status(200).json({Available:false})
      }
      else {

      
    
    res.status(200).json({available:true ,data});
    console.log(data)
      }
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





*/





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
