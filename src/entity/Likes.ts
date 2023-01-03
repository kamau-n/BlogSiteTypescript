import  { Column, Entity,PrimaryGeneratedColumn,ManyToOne, JoinColumn, JoinTable} from 'typeorm'
import { News } from './News';

@Entity() 
export class Likes   {
    @PrimaryGeneratedColumn()
    id!:number;

  @Column()
  newsId!:number;

    @ManyToOne(()=> News,(news)=>news.likes ,{cascade:true})
    news!:News
   


   
   


  
    
   

}