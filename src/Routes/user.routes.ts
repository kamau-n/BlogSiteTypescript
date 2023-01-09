import { Request, Response, Router } from "express";
import { getRepository } from "typeorm";
import { appDataSource } from "../configuration/connection";
import { Likes } from "../entity/Likes";
import { News } from "../entity/News";
import bcrypt = require("bcrypt");
import { User } from "../entity/User";
import jwt, { Secret } from "jsonwebtoken"
import { getCookie, setCookie } from "typescript-cookie";
//import extractJWT from "../middleware/jwtVerify";


const secret: Secret = "i have a secret";

const userRouter = Router()
const userRepository = appDataSource.getRepository(User)

userRouter.get("/user",async(req,res)=>{
    try
    {

     const users = await  userRepository.find()
     res.send(users)

    }
    catch(err){
        res.json({msg:"users were not found"})

    }

})

userRouter.post("/user", async (req, res) => {

    const hashed = await bcrypt.hash(req.body.password, 10)


    const data = { username: req.body.name, email: req.body.email, address: req.body.address, password: hashed }

    console.log(data)

    const exists = await userRepository.findOneBy({

        email: req.body.email
    }
    )


    if (!exists) {
        const newUser = await appDataSource.createQueryBuilder()
            .insert()
            .into(User)
            .values(data)
            .execute()



        console.log(newUser)
        res.status(200).json({ msg: "user has been created successfully" })
    }
    else {
        res.json({ msg: "user already exists" })
    }





})

userRouter.post("/login", async (req: Request, res: Response) => {
    const exists = await userRepository.findOneBy({
        email: req.body.email

    })
    if (exists) {
        const verified = await bcrypt.compare(exists.password, req.body.password)


        const AcessToken = jwt.sign({ name: exists.username, id: exists.id }, secret, { expiresIn: 1000 * 60 * 60 })
     

        const refreshToken= jwt.sign({ name: exists.username, id: exists.id }, secret,)

         //setCookie('accessToken',AcessToken)

        // setCookie('refreshToken',refreshToken)

        res.json({logged:true})
        // if (verified) {
           


        // }
        // else {
        //     res.json({ msg: "incorrect password" })
        // }


    }
    else {
        res.json({ msg: "user does not exist",logged:false })
    }

})


export default userRouter
