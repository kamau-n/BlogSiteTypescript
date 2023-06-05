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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Comment_1 = require("./Comment");
const Likes_1 = require("./Likes");
const Blog_1 = require("./Blog");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "verified", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Blog_1.Blog, (blogs) => blogs.user),
    __metadata("design:type", Array)
], User.prototype, "blogs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comment_1.Comments, (comments) => comments.user),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Likes_1.Likes, (likes) => likes.user),
    __metadata("design:type", Array)
], User.prototype, "likes", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
