const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
app.use(cors());

app.use(express.json());

const salt = bcrypt.genSaltSync(10);
mongoose.connect(
  "mongodb+srv://vikasvpattar18:vikas123@cluster0.7jlk873.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
    } else {
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(4000, () => console.log("server started"));

// mongodb+srv://vikasvpattar18:vikas123@cluster0.7jlk873.mongodb.net/?retryWrites=true&w=majority
// mongo pass vikas123
