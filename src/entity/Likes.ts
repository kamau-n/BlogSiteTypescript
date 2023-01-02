import  { Column, Entity,PrimaryGeneratedColumn,ManyToOne, JoinColumn} from 'typeorm'
import { News } from './News';

@Entity() 
export class Likes   {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    news_id!: number;

    @ManyToOne(()=> News,(news)=>news.likes)
    news!:News


   
   


  
    
   

}