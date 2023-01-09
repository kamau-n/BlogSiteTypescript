import { DataSource } from "typeorm";
import { Comments } from "../entity/Comment";
import { Likes } from "../entity/Likes";
import { News } from "../entity/News";
import { User } from "../entity/User";



export const appDataSource = new DataSource ( {
    type:"mysql",
    database:"News",
    username:"root",
    password:"",
    logging:false,
    synchronize: true,
    entities:[News,Likes,Comments,User]



})