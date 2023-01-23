import { NextFunction, Request, Response } from "express";

import jwt, { Secret } from "jsonwebtoken"

const secret:Secret="i have a secret";

const verifyJwt =(req:Request,res:Response,next:NextFunction)=>{
    //let token =req.headers.authorization?.split(' ')[1];

    const  token =localStorage.getItem("acessToken") || localStorage.getItem("refreshToken")
    if(token) {
     const decoded=   jwt.verify(token,secret)
     res.send(token)
     next()
     
        
        
    }
    else{
        res.status(401).json({msg:"Not authorized to use this route"})
        
    }

}
