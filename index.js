const express = require("express");
const app = express();
const { db } = require("./config/db");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


db.connect();

app.use(express.json());






app.listen(8080, () => {
  //("Server is running...");
});
