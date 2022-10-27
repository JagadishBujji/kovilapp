const express = require("express");
const path = require("path");
const cors = require("cors");
// const fs = require("fs");
// const {generate} = require('./generateZoomSignature');

const app = express();

app.use(express.static(path.join(__dirname, "build")));
// app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cors());

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(5000, () => {
  console.log("server started!!!");
});
