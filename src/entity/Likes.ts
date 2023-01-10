import  { Column, Entity,PrimaryGeneratedColumn,ManyToOne, JoinColumn, JoinTable, CreateDateColumn} from 'typeorm'
import { News } from './News';
import { User } from "./User";

@Entity() 
export class Likes   {
    @PrimaryGeneratedColumn()
    id!:number;

  @Column()
  newsId!:number;

  @Column()
  userId!:number;

  @CreateDateColumn()
  created_at!:Date;
 

    @ManyToOne(()=> News,(news)=>news.likes ,{cascade:true})
    news!:News
   

    @ManyToOne(()=> User , (user)=>user.comments,{onDelete:'CASCADE'})
    user!:User
   


   
   


  
    
   

}