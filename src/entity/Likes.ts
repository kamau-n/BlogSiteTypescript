import  { Column, Entity,PrimaryGeneratedColumn,ManyToOne, JoinColumn, JoinTable, CreateDateColumn} from 'typeorm'
import { News } from './News';

@Entity() 
export class Likes   {
    @PrimaryGeneratedColumn()
    id!:number;

  @Column()
  newsId!:number;

  @CreateDateColumn({type:"datetime"})
  createdAt!:Date;
 

    @ManyToOne(()=> News,(news)=>news.likes ,{cascade:true})
    news!:News
   


   
   


  
    
   

}