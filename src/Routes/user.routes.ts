import { Request, Response, Router } from "express";
import { getRepository } from "typeorm";
import { appDataSource } from "../configuration/connection";
import { Likes } from "../entity/Likes";
import { News } from "../entity/News";
import bcrypt = require("bcrypt");
import { User } from "../entity/User";



const userRouter=Router()
const userRepository=appDataSource.getRepository(User)

userRouter.post("/user",async(req,res)=>{

    const hashed = await bcrypt.hash(req.body.password,10)

    const data={username:req.body.name,email:req.body.email,address:req.body.address,password:hashed}

    console.log(data)

    const exists =await userRepository.findOneBy({
        
            email:req.body.email
        }
    )


if(!exists){
    const newUser = await appDataSource.createQueryBuilder()
    .insert()
    .into(User)
    .values(data)
    .execute()


    console.log(newUser)
    res.status(200).json({msg:"user has been created successfully"})
}
else {
    res.json({msg:"user already exists"})
}



    

})


export default userRouter
