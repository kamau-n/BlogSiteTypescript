import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken"

const extractJWT =(req:Request,res:Response,next:NextFunction)=>{
    let token =req.headers.authorization?.split(' ')[1];
    if(token) {
        
        
    }

}