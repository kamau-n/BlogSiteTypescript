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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connection_1 = require("../configuration/connection");
const Comment_1 = require("../entity/Comment");
const commentRouter = (0, express_1.Router)();
commentRouter.post("/blog/comment", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const inserted = yield connection_1.appDataSource.createQueryBuilder()
            .insert()
            .into(Comment_1.Comments)
            .values(req.body)
            .execute();
        res.status(200).json({ msg: "Comment added successfully", added: true });
        // console.log(inserted)
    }
    catch (e) {
        res.status(200).json({ msg: "Comment not added" });
        console.log(e);
    }
}));
commentRouter.post("/blog/comments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const commentsRepository = connection_1.appDataSource.getRepository(Comment_1.Comments);
    try {
        const comments = yield commentsRepository.find({
            relations: {
                user: true
            },
            where: {
                blogs: {
                    id: req.body.id
                }
            }
        });
        res.send(comments);
    }
    catch (err) {
        res.send(err);
    }
}));
exports.default = commentRouter;
