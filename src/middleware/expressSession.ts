import  {NextFunction,Request,Response} from "express"

import session from "express-session"

const sessionMiddleware = (req:Request,res:Response,next:NextFunction) =>{
    return session({
        secret:"i have a secret",
        resave:false,
        saveUninitialized:true,
        name:"userdata",
        cookie:{
            maxAge:1000*60*60
        }
    })
    (req,res,next)
    
}

export default sessionMiddleware;