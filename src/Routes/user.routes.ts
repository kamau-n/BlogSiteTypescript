import { Request, Response, Router, json } from "express";
import { getRepository } from "typeorm";
import { appDataSource } from "../configuration/connection";
import { Likes } from "../entity/Likes";
import { Blog } from "../entity/Blog";
import bcrypt = require("bcrypt");
import { User } from "../entity/User";
import jwt, { Secret } from "jsonwebtoken"
import { getCookie, setCookie, Cookies } from "typescript-cookie";
import session from "express-session"
import { error } from "console";
const LocalStorage = require('node-localstorage').LocalStorage;
//import extractJWT from "../middleware/jwtVerify";
const localStorage = new LocalStorage('./scratch');

const secret: Secret = "i have a secret";

const userRouter = Router()
const userRepository = appDataSource.getRepository(User)

userRouter.get("/user", async (req, res) => {
    try {

        const users = await userRepository.find()
        res.send(users)

    }
    catch (err) {
        res.json({ msg: "users were not found" })

    }

})


//this is a route for creating a user

userRouter.post("/user", async (req, res) => {

    console.log(req.body)

    const hashed = await bcrypt.hash(req.body.password, 10)


    const data = { username: req.body.username, email: req.body.email, address: req.body.address, password: hashed }

    // console.log(data, req.body)

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



        // console.log(newUser)
        res.status(200).json({ msg: "user has been created successfully" })
        console.log("user has been created successfully")
    }
    else {
        res.status(200).json({ msg: "user already exists", created:false})
        console.log("a user with that email already exist")
    }





})


// this is the login route


userRouter.post("/login", async (req: Request, res: Response) => {

    console.log(req.body)
    const exists = await userRepository.findOneBy({
        email: req.body.email

    })
    if (exists) {
        const verified = await bcrypt.compare(req.body.password, exists.password)

        if (verified) {
            const accessToken = jwt.sign({
                id: exists.id,
                name: exists.username,
                email: exists.email
            }, secret, { expiresIn: '1h' })

            res.status(201).json({ msg: "verification complete", login: true,token:accessToken })

        }
        else {
            res.json({ msg: "incorrect password", login: false })
            console.log("incorrect password")
        }



    }
    else {
        res.json({ msg: "user does not exist", login: false })
    }

})

userRouter.post("/token_authenticate",async(req,res)=>{
   // console.log(req.body.token)
    try{
    try {
        const decoded = jwt.verify(req.body.token, secret)
        res.status(200).json({msg:"authenticated sucessfully",user:decoded ,authenticated:true})
        
    } catch (error) {
        res.status(403).json({msg:"unable to authenticated",authenticated:false})
        
    }
      

    }
    catch(err) {
        console.log(err)
        res.status(200).json({msg:"unable to authenticated",authenticated:false})

    }
})


export default userRouter
