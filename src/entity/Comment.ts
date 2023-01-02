import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { News } from "./News";

  


@Entity()

export class Comments{
    @Column()
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    comment!:string


    @Column()
     newsId!:number;


    @ManyToOne(()=>News , (news)=>news.comments,{onDelete:"CASCADE"})
    news!:News

   
   

}