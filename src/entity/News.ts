import  { BaseEntity, Column, Entity,PrimaryGeneratedColumn,OneToMany, CreateDateColumn} from 'typeorm'
import { Comments } from './Comment';
import { Likes } from './Likes';

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
   


    @OneToMany(()=>Likes,(likes)=>likes.news )
    likes!:Likes[]
    

    @OneToMany(()=>Comments,(comments)=>comments.news)
    comments!:Comments[]

   


  
    
   

}
