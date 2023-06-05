"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
const typeorm_1 = require("typeorm");
const Comment_1 = require("../entity/Comment");
const Likes_1 = require("../entity/Likes");
const Blog_1 = require("../entity/Blog");
const User_1 = require("../entity/User");
const CommentsReply_1 = require("../entity/CommentsReply");
exports.appDataSource = new typeorm_1.DataSource({
    type: "mysql",
    database: "News",
    username: "root",
    password: "",
    logging: false,
    synchronize: true,
    entities: [Blog_1.Blog, Likes_1.Likes, Comment_1.Comments, User_1.User, CommentsReply_1.CommentsReply]
});
