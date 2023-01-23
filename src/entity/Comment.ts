import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Blog } from "./Blog";
import { User } from "./User";
import { Col } from "sequelize/types/utils";

  


@Entity()

export class Comments{
    @Column()
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    comment!:string


    @Column()
     newsId!:number;

     @Column()
     userId!:number;

     @CreateDateColumn()
     created_at!:Date;
    


    @ManyToOne(()=>Blog , (blogs)=>blogs.comments,{onDelete:"CASCADE"})
    blogs!:Blog


    @ManyToOne(()=> User , (user)=>user.comments,{onDelete:'CASCADE'})
    user!:User
   
   

}