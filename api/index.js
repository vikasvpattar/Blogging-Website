const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const Post = require("./models/Post");

const fs = require("fs");

const multer = require("multer");
const uploadmiddleware = multer({ dest: "uploads/" });

const cookiParser = require("cookie-parser");
app.use(cors({ credentials: true, origin: process.env.ORIGIN }));

app.use(express.json());
app.use(cookiParser());

app.use("/uploads", express.static(__dirname + "/uploads"));

const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRETE;
mongoose.connect(process.env.MONGO_LINK);

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

app.post("/post", uploadmiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const { title, summary, content } = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });
      res.json(postDoc);
    });
  }
});

app.put("/post", uploadmiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("you are not the author");
    }
    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
  });
});

app.get("/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);

  res.json(postDoc);
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.listen(process.env.API_PORT, () => console.log("server started"));
