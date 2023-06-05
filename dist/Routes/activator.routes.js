"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../entity/User");
const connection_1 = require("../configuration/connection");
const activateRouter = (0, express_1.Router)();
activateRouter.post("/activator", (req, res) => {
    console.log(req.body);
    const { verification_code, user_code, user_email } = req.body;
    if (user_code == verification_code) {
        const user = connection_1.appDataSource.getRepository(User_1.User);
        try {
            user.createQueryBuilder()
                .update(User_1.User)
                .set({ verified: true })
                .where("email=:email", { email: user_email })
                .execute();
            res.json({ msg: "Acount activated successfully", activated: true });
            console.log("account verified successfully");
        }
        catch (err) {
            res.send("an error occured");
            console.log("there was an error");
            console.log(err);
        }
    }
    else {
        res.json({ msg: "unable to verify your account", verification: false });
    }
});
exports.default = activateRouter;
