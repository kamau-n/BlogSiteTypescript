"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importStar(require("express"));
const connection_1 = require("./configuration/connection");
const blogs_routes_1 = __importDefault(require("./Routes/blogs.routes"));
const cors_1 = __importDefault(require("cors"));
const comments_routes_1 = __importDefault(require("./Routes/comments.routes"));
const user_routes_1 = __importDefault(require("./Routes/user.routes"));
const mailer_routes_1 = __importDefault(require("./Routes/mailer.routes"));
const activator_routes_1 = __importDefault(require("./Routes/activator.routes"));
const corsOptions = {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// app.use(expressSession)
app.use("/", blogs_routes_1.default, mailer_routes_1.default);
app.use("/", comments_routes_1.default, activator_routes_1.default);
app.use("/", user_routes_1.default);
try {
    connection_1.appDataSource.initialize()
        .then(() => { console.log("the connection has been established"); })
        .catch((err) => {
        console.log("there was a problem in the connection" + err);
        // response.json({mg:"unable to connect to server"})
    });
}
catch (err) {
    express_1.response.send("unable to connect to the server");
    console.log(err);
}
try {
    app.listen(8000, () => {
        console.log("we have been connectefd to a port");
    });
}
catch (err) {
    express_1.response.json({ msg: "internal server error" });
    console.log(err);
}
