import { NextFunction, Request, Response } from "express";

import jwt, { Secret } from "jsonwebtoken"

const secret:Secret="i have a secret";

const verifyJwt =(req:Request,res:Response,next:NextFunction)=>{
    let token =req.headers.authorization?.split(' ')[1];
    if(token) {
     const decoded=   jwt.verify(token,secret)
     res.send(token)
     next()
     
        
        
    }
    else{
        res.send("the authentication failed")
        
    }

}
