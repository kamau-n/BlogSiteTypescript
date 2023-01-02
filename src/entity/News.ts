import  { BaseEntity, Column, Entity,PrimaryGeneratedColumn,OneToMany} from 'typeorm'
import { Likes } from './Likes';

@Entity() 
export class News   {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    title!: string;

    @Column()
    content!:string;


    @OneToMany(()=>Likes,(likes)=>likes.news)
    likes!:Likes[]

   


  
    
   

}
