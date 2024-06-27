const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Router = require("./routes/routes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/api',Router);

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
