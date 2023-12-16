const express = require("express");
const app = express();

// It is used to encrypt the Passwords
const bcrypt = require("bcryptjs");

// importing the User schema
const User = require("./models/User");

// cors is used to give access to the websites from other url
const cors = require("cors");
const mongoose = require("mongoose");

// json web token is used to store the login details in the cookie
const jwt = require("jsonwebtoken");

// used to access .env file
const dotenv = require("dotenv");
dotenv.config();

// To access post schema
const Post = require("./models/Post");

// To read files from uploads folder
const fs = require("fs");

// Multer library is used to store the thumbnails into uploads folder
const multer = require("multer");
const uploadmiddleware = multer({ dest: "uploads/" });

// It is used to access cookies
const cookieParser = require("cookie-parser");

const corsOptions = {
  origin: ["http://localhost:5173", process.env.ORIGIN],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable credentials (cookies, authorization headers)
  optionsSuccessStatus: 204, // Respond to preflight requests with 204 No Content
};

// This wil allow the front end to access the backend
app.use(cors(corsOptions));
// app.use(cors({ credentials: true,origin:"*" }));

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(__dirname + "/uploads"));

// To create encryption
const salt = bcrypt.genSaltSync(10);
const secret = `${process.env.SECRETE}`;

// connecting the mongodb atlas using mongoose
mongoose
  .connect(`${process.env.MONGO_LINK}`)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

// Using this api user can register to the website
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    // pushing the data into database and encrypting the password
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json(e);
  }
});

// Using this api user can login to the website
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    // it will compare the entered data and data from database if it is same means then it will allow the user to the website
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

// This api is used to access who is using the website
app.get("/profile", (req, res) => {
  try {
    // Accessing the data from cookie
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

// Tis is used to post the post in the website
app.post("/post", uploadmiddleware.single("file"), async (req, res) => {
  // accessing the thumbnail
  const { originalname, path } = req.file;
  // splitting the file name
  const parts = originalname.split(".");
  // storing the thumbnail into uploads
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      // Accessing the data from form
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

// This api is used to update the post
app.put("/post", uploadmiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    // Accessing the thumbnail and updating it
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;

    // updating the data
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

// Accessing the post from the database
app.get("/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

// Accessing the specific data
app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);

  res.json(postDoc);
});

// Logout functionality
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

const PORT = process.env.API_PORT || 4000;

app.listen(PORT, () => console.log("server started"));

module.exports = app;
