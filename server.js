const express = require("express");
const path = require("path");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
var CryptoJS = require("crypto-js"); 
const dotenv =require("dotenv")


// var http = require('http');

// var urlencode = require('urlencode');

// const fs = require("fs");
// const {generate} = require('./generateZoomSignature');


const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));
// app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cors());

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dummymail00197@gmail.com",
    pass: "xifiojbgnkvboffp",
  },
});



// let transporter = nodemailer.createTransport({
//   host: "email-smtp.ap-south-1.amazonaws.com",
//   service: "amazonaws.com",
//   secure: true, // true for 465, false for other ports
//   auth: {
//     user: process.env.USER, // generated ethereal user
//     pass: process.env.PASSWORD, // generated ethereal password
//   },
// });

app.get("/test", (req, res) => {
  res.send("success");
});



app.post("/sendMail",async (req, res) => {
  console.log(req.body) 
  var bytes  = CryptoJS.AES.decrypt(req.body.password, 'kovilapp');
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  // const temp="acs"
  // console.log(originalText)
//   Dear <Username>,

// Namaskaram!

// Please use this temporary password to login to your account and change your password!

// Thanks,
// KovilApp Team
 await transporter
    .sendMail({
      from: "dummymail00197@gmail.com", // sender address
      to: req.body.email, // list of receivers
      subject: "Temporary password - KOVIL ✔", // Subject line
      // html: `<b>Hi ${req.body.name}, your temporary password for subadmin login is- ${originalText}</b>`, // html body
      html:` 
      <b> 
      Dear ${req.body.name}, 
      Namaskaram! 
      Please use this '${originalText}' temporary password to login to your account and change your password!
      Thanks,
      KovilApp Team
      </b>
      `
    })
    .then((result) => {
      // console.log(result);
      res.status(200).send("success");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).sendStatus(500).send("failure");
    });
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(5001, () => {
  console.log("server started!!!");
});
