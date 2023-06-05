import bodyParser from "body-parser";
import  express, { response }  from "express";
import { Response}  from "express";
import {appDataSource }from "./configuration/connection";
import newRouter from "./Routes/blogs.routes";
import cors from "cors"
import commentRouter from "./Routes/comments.routes";
import userRouter from "./Routes/user.routes";
import mailRouter from "./Routes/mailer.routes"
import activateRouter from "./Routes/activator.routes";



const corsOptions = {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST","DELETE"],
    credentials: true
  }

const app =express();
app.use(cors(corsOptions))
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}));

// app.use(expressSession)
app.use("/",newRouter,mailRouter)
app.use("/",commentRouter,activateRouter)
app.use("/",userRouter)



try {

appDataSource.initialize()
.then(()=> {console.log("the connection has been established")})
.catch((err,)=>{
  console.log("there was a problem in the connection" + err)
 // response.json({mg:"unable to connect to server"})
 })

}

catch(err) {
  response.send("unable to connect to the server")
  console.log(err)
}



try {
app.listen(8000,()=>{
    console.log("we have been connectefd to a port")
})

}
catch(err) {
  response.json({msg:"internal server error"})
  console.log(err)
  
}
