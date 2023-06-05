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
exports.Comments = void 0;
const typeorm_1 = require("typeorm");
const Blog_1 = require("./Blog");
const User_1 = require("./User");
let Comments = class Comments {
};
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Comments.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Comments.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Comments.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Comments.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Comments.prototype, "blogsId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Blog_1.Blog, (blogs) => blogs.comments, { onDelete: "CASCADE" }),
    __metadata("design:type", Blog_1.Blog)
], Comments.prototype, "blogs", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.comments, { onDelete: 'CASCADE' }),
    __metadata("design:type", User_1.User
    // @OneToMany(()=>CommentsReply,(Commentsreply)=>Commentsreply.comments,{onDelete:"CASCADE"})
    // commentsreply!:CommentsReply[]
    )
], Comments.prototype, "user", void 0);
Comments = __decorate([
    (0, typeorm_1.Entity)()
], Comments);
exports.Comments = Comments;
