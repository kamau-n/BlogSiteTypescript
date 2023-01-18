import  { BaseEntity, Column, Entity,PrimaryGeneratedColumn,OneToMany, CreateDateColumn} from 'typeorm'
import { Comments } from './Comment';
import { Likes } from './Likes';
import { type } from 'os';
import { text } from 'express';

@Entity() 
export class News   {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    title!: string;

    @Column()
    content!:string;

    @CreateDateColumn({type:"datetime"})
    createdAt!:Date;
    

    @Column()
    topic!:string;


    @OneToMany(()=>Likes,(likes)=>likes.news )
    likes!:Likes[]
    

    @OneToMany(()=>Comments,(comments)=>comments.news)
    comments!:Comments[]

   


  
    
   

}
