const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookiParser = require("cookie-parser");
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(express.json());
app.use(cookiParser());

const salt = bcrypt.genSaltSync(10);
const secret = "sgsjwsuuwiwmsbbshhhhhhhhslhsv";
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
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({ id: userDoc._id, username });
      });
    } else {
      res.status(400).json("wrong credentials");
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get("/profile", (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.listen(4000, () => console.log("server started"));

// mongodb+srv://vikasvpattar18:vikas123@cluster0.7jlk873.mongodb.net/?retryWrites=true&w=majority
// mongo pass vikas123
