import bodyParser from "body-parser";
import  express, { response }  from "express";
import { Response}  from "express";
import {appDataSource }from "./configuration/connection";
import newRouter from "./Routes/news.routes";
import cors from "cors"
import commentRouter from "./Routes/comments.routes";
import userRouter from "./Routes/user.routes";


const corsOptions = {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST","DELETE"],
    credentials: true
  }

const app =express();
app.use(cors(corsOptions))
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}));


app.use("/",newRouter)
app.use("/",commentRouter)
app.use("/",userRouter)

console.log("we are trying to connect")

try {

appDataSource.initialize()
.then(()=> {console.log("the connection has been established")})
.catch((err,)=>{
  console.log("there was a problem in the connection" )
  response.json({mg:"unable to connect to server"})
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
