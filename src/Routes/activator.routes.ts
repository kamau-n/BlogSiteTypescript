import { Router } from "express";
import { User } from "../entity/User";
import { appDataSource } from "../configuration/connection";




const activateRouter = Router();

activateRouter.post("/activator" ,(req,res)=>{
    console.log(req.body)
    const {verification_code,user_code,user_email} = req.body



    if(user_code==verification_code) {

    
    const user = appDataSource.getRepository(User);
    try {
    user.createQueryBuilder()
    .update(User)
    .set({verified:true})
    .where("email=:email",{email:user_email})
    .execute()
    res.json({msg:"Acount activated successfully",activated:true})
    console.log("account verified successfully")
    }
    catch(err) {
        res.send("an error occured")
        console.log("there was an error")
        
        
        console.log(err)
    }
}
else {
    res.json({msg:"unable to verify your account",verification:false})
}
    

    

})


export default activateRouter;



