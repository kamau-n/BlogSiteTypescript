"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const express_1 = require("express");
const mailRouter = (0, express_1.Router)();
mailRouter.post("/mailer", (req, res) => {
    console.log(req.body);
    const { user_email } = req.body;
    function generateRandomCode() {
        const min = 100000; // minimum 6-digit number
        const max = 999999; // maximum 6-digit number
        const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomCode.toString();
    }
    const randomCode = generateRandomCode();
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "kamaun629@gmail.com",
            pass: "smnpmadsefqbtzlk"
        }
    });
    const mailOptions = {
        from: "kamaun629@gmail.com",
        to: user_email,
        subject: "Account verification",
        html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
          }
          h1 {
            color: blue;
            text-align:center

          }
          p {
            font-size: 16px;
          }
          span {
            font:17px;
            color:green
          }
        </style>
      </head>
      <body>
        <h1>Welcome to Geddit</h1>
        <p>Your Account Verification Code is :  <span>${randomCode}<span> .</p>
        <p>This message has been send from geddit, it is for account verification.</p>
        <p> Do not share this code with anyone </p>
      </body>
    </html>
  `,
    };
    try {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                res.json({ msg: "We are unable to verify your account, please try again", verification_sent: false });
            }
            else {
                console.log("sent successfully");
                res.json({ msg: "email sent successfully", verification_code: randomCode, verfication_sent: true });
            }
        });
    }
    catch (err) {
        console.log(err);
        res.json({ msg: "unable to verifiy your application , please try again", verification_sent: false });
    }
});
exports.default = mailRouter;
