"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const typeorm_1 = require("typeorm");
const Comment_1 = require("./Comment");
const Likes_1 = require("./Likes");
const User_1 = require("./User");
let Blog = class Blog {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Blog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Blog.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], Blog.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], Blog.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Blog.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Blog.prototype, "topic", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Blog.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.blogs),
    __metadata("design:type", User_1.User)
], Blog.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Likes_1.Likes, (likes) => likes.blogs),
    __metadata("design:type", Array)
], Blog.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comment_1.Comments, (comments) => comments.blogs),
    __metadata("design:type", Array)
], Blog.prototype, "comments", void 0);
Blog = __decorate([
    (0, typeorm_1.Entity)()
], Blog);
exports.Blog = Blog;
