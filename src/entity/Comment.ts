import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Blog } from "./Blog";
import { User } from "./User";

import { CommentsReply } from "./CommentsReply";




@Entity()

export class Comments {
    @Column()
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    comment!: string



    @Column()
    userId!: number;

    @CreateDateColumn()
    created_at!: Date;

    @Column()
    blogsId!: number;



    @ManyToOne(() => Blog, (blogs) => blogs.comments, { onDelete: "CASCADE" })
    blogs!: Blog


    @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
    user!: User

    // @OneToMany(()=>CommentsReply,(Commentsreply)=>Commentsreply.comments,{onDelete:"CASCADE"})
    // commentsreply!:CommentsReply[]




}