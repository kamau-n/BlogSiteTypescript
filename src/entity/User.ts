import { type, userInfo } from "os";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Comments } from "./Comment";
import { Likes } from "./Likes";
import { Blog } from "./Blog";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!:number
    

    @Column()
    username!:string;

    @Column()
    email!:string;

    @Column()
    address!:string

    @Column()
    password!:string

    @Column({ type:"boolean",default:false})
    verified!:boolean
    



   @CreateDateColumn({type:"datetime"})
   createdAt!:Date;
  
   @OneToMany(()=>Blog,(blogs)=>blogs.user)
   blogs!:Blog[]


   @OneToMany(()=>Comments,(comments)=>comments.user)
   comments!:Comments[]

   @OneToMany(()=>Likes,(likes)=>likes.user)
   likes!:Likes[]

}