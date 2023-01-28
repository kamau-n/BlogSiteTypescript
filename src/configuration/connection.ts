import { DataSource } from "typeorm";
import { Comments } from "../entity/Comment";
import { Likes } from "../entity/Likes";
import { Blog } from "../entity/Blog";
import { User } from "../entity/User";
import { CommentsReply } from "../entity/CommentsReply";



export const appDataSource = new DataSource ( {
    type:"mysql",
    database:"News",
    username:"root",
    password:"",
    logging:true,
    synchronize: true,
    entities:[Blog,Likes,Comments,User,CommentsReply]



})