"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const sessionMiddleware = (req, res, next) => {
    return (0, express_session_1.default)({
        secret: "i have a secret",
        resave: false,
        saveUninitialized: true,
        name: "userdata",
        cookie: {
            maxAge: 1000 * 60 * 60
        }
    })(req, res, next);
};
exports.default = sessionMiddleware;
