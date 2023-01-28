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
userRouter.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hashed = yield bcrypt.hash(req.body.password, 10);
    const data = { username: req.body.name, email: req.body.email, address: req.body.address, password: hashed };
    console.log(data);
    const exists = yield userRepository.findOneBy({
        email: req.body.email
    });
    if (!exists) {
        const newUser = yield connection_1.appDataSource.createQueryBuilder()
            .insert()
            .into(User_1.User)
            .values(data)
            .execute();
        console.log(newUser);
        res.status(200).json({ msg: "user has been created successfully" });
        console.log("user has been created successfully");
    }
    else {
        res.json({ msg: "user already exists" });
        console.log("a user with that email already exist");
    }
}));
userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
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
            }, secret);
            //     localStorage.setItem("acessToken",{name:"kamau"})
            // console.log(accessToken)
            res.status(201).cookie("authToken", accessToken).json({ msg: "verification complete", login: true });
            console.log(req.cookies);
        }
        else {
            res.json({ msg: "incorrect password", login: false });
            console.log("incorrect password");
        }
    }
    else {
        res.json({ msg: "user does not exist", login: false });
    }
}));
exports.default = userRouter;
