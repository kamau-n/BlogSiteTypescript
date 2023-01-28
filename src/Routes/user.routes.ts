import { Request, Response, Router, json } from "express";
import { getRepository } from "typeorm";
import { appDataSource } from "../configuration/connection";
import { Likes } from "../entity/Likes";
import { Blog } from "../entity/Blog";
import bcrypt = require("bcrypt");
import { User } from "../entity/User";
import jwt, { Secret } from "jsonwebtoken"
import { getCookie, setCookie,Cookies } from "typescript-cookie";
import session from "express-session"
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
        console.log("user has been created successfully")
    }
    else {
        res.json({ msg: "user already exists" })
        console.log("a user with that email already exist")
    }





})

userRouter.post("/login", async (req: Request, res: Response) => {

    console.log(req.body)
    const exists = await userRepository.findOneBy({
        email: req.body.email

    })
    if (exists) {
        const verified = await bcrypt.compare( req.body.password,exists.password)

        if (verified) {
          const accessToken=  jwt.sign({
                id:exists.id,
                name:exists.username,
                email:exists.email
            },secret,{expiresIn:'60000'})

            res.status(201).cookie("authToken",accessToken,{maxAge:300000}).json({msg:"verification complete",login:true})

console.log(req.cookies)
        }
        else {
            res.json({ msg: "incorrect password",login:false })
            console.log("incorrect password")
        }


    
    }
    else {
        res.json({ msg: "user does not exist", login: false })
    }

})


export default userRouter
