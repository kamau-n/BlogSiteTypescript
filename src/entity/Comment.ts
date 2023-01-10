import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { News } from "./News";
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
    


    @ManyToOne(()=>News , (news)=>news.comments,{onDelete:"CASCADE"})
    news!:News


    @ManyToOne(()=> User , (user)=>user.comments,{onDelete:'CASCADE'})
    user!:User
   
   

}