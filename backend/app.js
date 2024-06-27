const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.get("/", (req, res) => res.send("hello world"));

// mongodb connection
mongoose
  .connect("mongodb://localhost/examjs")
  .then(() => {
    console.log("Connected to mongodb");
    app.listen(3000, () => console.log("App running on port: 3000"));
  })
  .catch((e) => {
    console.log(`An error in connecting to mongodb: ${e}`);
  });
