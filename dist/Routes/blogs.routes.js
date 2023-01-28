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
const Likes_1 = require("../entity/Likes");
const Blog_1 = require("../entity/Blog");
const newRouter = (0, express_1.Router)();
// creating a new blog article
newRouter.post("/blogs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("create route has been accessed");
    // console.log(req.body);
    try {
        const news = yield connection_1.appDataSource
            .createQueryBuilder()
            .insert()
            .into(Blog_1.Blog)
            .values(req.body)
            .execute();
        res.json({ message: "news successfully added", created: true });
    }
    catch (error) {
        console.log("there was an error" + error);
        res.status(200).json({ created: false, msg: "Unable to create the news Article" });
    }
}));
//  Getting all the blog articles
newRouter.get("/blogs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const news = connection_1.appDataSource.getRepository(Blog_1.Blog);
    try {
        const data = yield connection_1.appDataSource
            .createQueryBuilder()
            .select("blog")
            .from(Blog_1.Blog, "blog")
            .getMany();
        res.status(200).json(data);
        console.log(data);
    }
    catch (e) {
        res.send("there was an error in retrieving the news");
        console.log(e);
    }
}));
newRouter.get("/blog/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id);
    const newsRepository = connection_1.appDataSource.getRepository(Blog_1.Blog);
    try {
        const article = yield connection_1.appDataSource
            .createQueryBuilder()
            .select()
            .from(Blog_1.Blog, "article")
            .where("id=:news_id", { news_id: req.params.id })
            .execute();
        res.send(article);
    }
    catch (err) {
        res.json({ msg: "there was an error in the retrival of the information" });
    }
}));
newRouter.delete("/blog", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = connection_1.appDataSource.getRepository(Blog_1.Blog);
    try {
        yield blogs.delete(1);
        res.send("deleted");
    }
    catch (e) {
        res.send("unable to delete");
    }
}));
// getting the new article by topic 
newRouter.post("/blog/topic", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const topic = req.body.topic;
    const news = connection_1.appDataSource.getRepository(Blog_1.Blog);
    try {
        const data = yield connection_1.appDataSource
            .createQueryBuilder()
            .select()
            .from(Blog_1.Blog, "blogs")
            .where("topic=:topic", { topic: topic })
            .execute();
        if (data.length == 0) {
            res.status(200).json({ Available: false });
        }
        else {
            res.status(200).json({ available: true, data });
            console.log(data);
        }
    }
    catch (e) {
        res.send("there was an error in retrieving the news");
    }
}));
//this is a route for liking a news article
newRouter.post("/blog/like", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    // try {
    //   const likes = await appDataSource
    //     .createQueryBuilder()
    //     .insert()
    //     .into(Likes)
    //     .values(req.body)
    //     .execute();
    const blogsRepository = connection_1.appDataSource.getRepository(Blog_1.Blog);
    try {
        const blogs = yield blogsRepository.find({
            relations: {
                users: true
            }
        });
        res.status(200).json(blogs);
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "unable to like the post" });
    }
}));
/*





*/
newRouter.post("/blog/likes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("route has been accessed");
    const blogLikes = connection_1.appDataSource.getRepository(Likes_1.Likes);
    try {
        const likes = yield blogLikes
            .createQueryBuilder()
            .addSelect("COUNT(*)", "likes")
            .where("Likes.blogId=:id", { id: req.body.blogId })
            .getRawOne();
        res.send(likes.likes);
    }
    catch (err) {
        res.send(err);
    }
}));
exports.default = newRouter;
