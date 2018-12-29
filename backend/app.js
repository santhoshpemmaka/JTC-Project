const express = require("express");
const bodyParser = require("body-parser");
const Post = require("./models/model");
const app = express();
const mongoose = require("mongoose");
const PostSchema = require("./models/model");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS"
  );
  next();
});
//MongoClient.connect('mongodb://user:password@127.0.0.1:27017/yourDB', { useNewUrlParser: true } )
mongoose
  .connect(
    "mongodb://santhoshpemmaka:santhoshjnv1@ds239128.mlab.com:39128/project"
  )
  .then(() => {
    console.log("Database conected!");
  })
  .catch(() => {
    console.log("conection failed!");
  });
app.post("/api/posts", (req, res) => {
  const post = new Post({
    title: req.body.title,
    date: req.body.date,
    content: req.body.content,
    counter: 0
  });
  post.save();
  res.status(201).json({
    message: "posts added succesful"
  });
});
app.get("/api/posts", (req, res) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});
///let counter = 0;
/*app.post("/api/post", (req, res) => {
  console.log(req.body.id);
  res.status(200).json({
    message: "addedd"
  });
  PostSchema.findById({ _id: req.body.id }).then(id => {
    if (id) {
      counter = counter + 1;
      console.log("exists");
    }
    const post = new Post({
      counter: counter
    });
    post.save();

    console.log(counter);
    // console.log(req.count);
  });
});*/
let counter1 = 0;
app.post("/api/post", (req, res) => {
  PostSchema.find({ _id: req.body.id }).then(res => {
    console.log("block: ", res);
    let block = res[0];
    if (block) {
      counter1 = block.counter;
      counter1 = counter1 + 1;
    }
    var sa = { _id: req.body.id };
    var sa1 = { $set: { counter: counter1 } };
    PostSchema.updateOne(sa, sa1, (err, res) => {
      if (err) console.log("error occured");
      else {
        console.log("updated", res);
      }
    });
  });
});
module.exports = app;
