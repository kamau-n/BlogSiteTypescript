import { type, userInfo } from "os";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Comments } from "./Comment";
import { Likes } from "./Likes";

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

   @CreateDateColumn({type:"datetime"})
   createdAt!:Date;
  
   @OneToMany(()=>Comments,(comments)=>comments.user)
   comments!:Comments[]

   @OneToMany(()=>Likes,(likes)=>likes.user)
   likes!:Likes[]

}