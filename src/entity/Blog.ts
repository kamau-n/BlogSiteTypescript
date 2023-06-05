import  { BaseEntity, Column, Entity,PrimaryGeneratedColumn,OneToMany, CreateDateColumn, ManyToOne} from 'typeorm'
import { Comments } from './Comment';
import { Likes } from './Likes';
import { type } from 'os';
import { text } from 'express';
import { User } from './User';

@Entity() 
export class Blog   {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    title!: string;

    @Column("text")
    content!:string;

    @CreateDateColumn({type:"datetime"})
    createdAt!:Date;
    

    @Column()
    image!:string;

    @Column()
    topic!:string;

    @Column()
    userId!:string;


    @ManyToOne(()=>User,(user)=>user.blogs)
    user!:User;

    @OneToMany(()=>Likes,(likes)=>likes.blogs )
    likes!:Likes[]
    

    @OneToMany(()=>Comments,(comments)=>comments.blogs)
    comments!:Comments[]

   


  
    
   

}
