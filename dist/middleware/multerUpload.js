"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
// import { new_variables_request } from "../interfaces/filenames";
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
        console.log("i have been accessed");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
        req.file_name = Date.now() + "-" + file.originalname;
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
        console.log("the image type is  " + file.mimetype);
        // console.log(  req.file_name)
    }
    else {
        cb(new Error("Invalid file type, only JPEG and PNG are allowed!"), false);
    }
};
const multerUpload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
});
//console.log(fileFilter)
exports.default = multerUpload;
