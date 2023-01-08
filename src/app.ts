import bodyParser from "body-parser";
import  express  from "express";
import {appDataSource }from "./configuration/connection";
import newRouter from "./Routes/news.routes";
import cors from "cors"
import commentRouter from "./Routes/comments.routes";
import userRouter from "./Routes/user.routes";


// const corsOptions = {
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST","DELETE"],
//     credentials: true
//   }

const app =express();
app.use(cors())
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}));


app.use("/",newRouter)
app.use("/",commentRouter)
app.use("/",userRouter)

appDataSource.initialize()
.then(()=>console.log("the connection has been established"))
.catch((err)=>console.log("there was a problem in the connection" + err))





app.listen(8000,()=>{
    console.log("we have been connectefd to a port")
})


