const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
  title: String,
  date: String,
  content: String,
  counter: Number
});
module.exports = mongoose.model("Post", PostSchema);
