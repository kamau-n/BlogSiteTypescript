import { Column, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Comments } from "./Comment";


export class CommentsReply {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    commentId!:number;


    

    @Column()
    reply!:string

    @CreateDateColumn()
    commented_At!:Date;

    // @ManyToOne(()=>Comments,(comments)=>comments.commentsreply,{onDelete:"CASCADE"}  )
    // comments!:Comments

    


}