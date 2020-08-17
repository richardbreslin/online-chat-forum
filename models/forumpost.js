const mongoose = require("mongoose");

//Schematic for data models
const Schema = mongoose.Schema;
const newPostSchema = new Schema({
  imageURL: String,
  forumBody: String,
  forumId: String,
});

//model = mongoose.model(<name of model>. <schematic for model>)
const ForumPost = new mongoose.model("ForumPost", newPostSchema);

module.exports = ForumPost;

//saving data to mongo data base.
// const forumData = {
//   imgURL:
//     "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
//   forumBody: "first data entry",
//   forumId: "",
// };
