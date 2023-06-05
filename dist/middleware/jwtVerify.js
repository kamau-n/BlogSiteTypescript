"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = "i have a secret";
const verifyJwt = (req, res, next) => {
    var _a;
    let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (token) {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        res.send(token);
        next();
    }
    else {
        res.status(401).json({ msg: "Not authorized to use this route" });
    }
};
exports.default = verifyJwt;
