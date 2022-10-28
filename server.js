const express = require("express");
const path = require("path");
const cors = require("cors");
const nodemailer=require("nodemailer")
const bodyParser=require("body-parser");  
// const fs = require("fs");
// const {generate} = require('./generateZoomSignature');

const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "build")));
// app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cors());

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(5000, () => {
  console.log("server started!!!");
});

let transporter = nodemailer.createTransport({
  host: "email-smtp.ap-south-1.amazonaws.com", 
  service:"amazonaws.com",
  secure: false, // true for 465, false for other ports
  auth: {
    user: "AKIA5HE2R77PRXSWSEXK", // generated ethereal user
    pass: "BGD8k2+XBmyCyiv9vTDoy/ez8Gx/JeZpdEOwTSb1XaHe", // generated ethereal password
  },
});

// send mail with defined transport object
 

app.post("/sendMail",async(req,res)=>{ 
  res.json("hello")

  await transporter.sendMail({
    from: 'info@kovilapp.in', // sender address
    to: req.body.email, // list of receivers
    subject: "Temporary password - KOVIL ✔", // Subject line
    text: "hi", // plain text body
    html: `<b>Hi ${req.body.name}, your temporary password for subadmin login
    is- ${req.body.password}</b>`, // html body
  }).then((res)=>{
    console.log(res);
  }).catch((err)=>{
    console.log(err);
  })
 
})