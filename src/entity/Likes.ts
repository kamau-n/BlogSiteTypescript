import  { Column, Entity,PrimaryGeneratedColumn,ManyToOne, JoinColumn, JoinTable, CreateDateColumn} from 'typeorm'
import { Blog } from './Blog';
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
 

    @ManyToOne(()=> Blog,(blogs)=>blogs.likes ,{cascade:true})
    blogs!:Blog
   

    @ManyToOne(()=> User , (user)=>user.comments,{onDelete:'CASCADE'})
    user!:User
   


   
   


  
    
   

}