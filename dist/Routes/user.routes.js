"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connection_1 = require("../configuration/connection");
const bcrypt = require("bcrypt");
const User_1 = require("../entity/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const LocalStorage = require('node-localstorage').LocalStorage;
//import extractJWT from "../middleware/jwtVerify";
const localStorage = new LocalStorage('./scratch');
const secret = "i have a secret";
const userRouter = (0, express_1.Router)();
const userRepository = connection_1.appDataSource.getRepository(User_1.User);
userRouter.get("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userRepository.find();
        res.send(users);
    }
    catch (err) {
        res.json({ msg: "users were not found" });
    }
}));
//this is a route for creating a user
userRouter.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const hashed = yield bcrypt.hash(req.body.password, 10);
        const data = { username: req.body.username, verified: false, email: req.body.email, address: req.body.address, password: hashed };
        // console.log(data, req.body)
        const exists = yield userRepository.findOneBy({
            email: req.body.email
        });
        if (!exists) {
            const newUser = yield connection_1.appDataSource.createQueryBuilder()
                .insert()
                .into(User_1.User)
                .values(data)
                .execute();
            // console.log(newUser)
            res.status(200).json({ msg: "user has been created successfully", created: true });
            console.log("user has been created successfully");
        }
        else {
            res.status(200).json({ msg: "user already exists", created: false });
            console.log("a user with that email already exist");
        }
    }
    catch (err) {
        console.log(err);
        res.status(200).json({ msg: "unable to create a user", created: false });
    }
}));
userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const exists = yield userRepository.findOneBy({
            email: req.body.email
        });
        if (exists) {
            const verified = yield bcrypt.compare(req.body.password, exists.password);
            if (verified) {
                const accessToken = jsonwebtoken_1.default.sign({
                    id: exists.id,
                    name: exists.username,
                    email: exists.email
                }, secret, { expiresIn: '1h' });
                res.status(201).json({ msg: "verification complete", login: true, token: accessToken });
                // res.cookie("accessToken",accessToken,{maxAge:1000*60*60,httpOnly:true})
            }
            else {
                res.json({ msg: "incorrect password", login: false });
                console.log("incorrect password");
            }
        }
        else {
            res.json({ msg: "user does not exist", login: false });
        }
    }
    catch (err) {
        console.log(err);
        //res.json({ msg: "unable to login", login: false })
    }
}));
userRouter.post("/token_authenticate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body.token)
    try {
        try {
            const decoded = jsonwebtoken_1.default.verify(req.body.token, secret);
            res.status(200).json({ msg: "authenticated sucessfully", user: decoded, authenticated: true });
        }
        catch (error) {
            res.status(403).json({ msg: "unable to authenticated", authenticated: false });
        }
    }
    catch (err) {
        console.log(err);
        res.status(200).json({ msg: "unable to authenticated", authenticated: false });
    }
}));
exports.default = userRouter;
