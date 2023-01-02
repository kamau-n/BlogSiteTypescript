import bodyParser from "body-parser";
import  express  from "express";
import {appDataSource }from "./configuration/connection";
import newRouter from "./Routes/news.routes";
import cors from 'cors'


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

appDataSource.initialize()
.then(()=>console.log("the connection has been established"))
.catch(()=>console.log("there was a problem in the connection"))





app.listen(8000,()=>{
    console.log("we have been connectefd to a port")
})


