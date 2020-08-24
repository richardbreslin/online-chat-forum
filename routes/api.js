const express = require("express");
const router = express.Router();
const ForumPost = require("../models/forumpost");
const path = require("path");
var ObjectID = require("mongodb").ObjectID;

//Routes
router.post("/createpost", (req, res) => {
  const data = req.body;

  const newForumPost = new ForumPost(data);

  newForumPost.save((error) => {
    if (error) {
      res.status(500).json({ msg: "Sorry, internal server errors" });
      console.log("Post request failed");
    } else {
      console.log("Post request succeeded.");
      console.log(data);
    }
  });
});

router.get("/getposts", (req, res) => {
  ForumPost.find(function (err, returnedPosts) {
    if (err) {
      return console.error(err);
    }
    res.send(returnedPosts);
    console.log(returnedPosts);
  });
});

router.put("/reply", (req, res) => {
  const data = req.body;

  // console.log(data, "this is a console.log");
  // console.log("this is the forumId", data.forumId);
  // console.log("this is the comURL", data.comments.comURL);
  // console.log("this is the comBody", data.comments.comBody);

  const update = {
    $set: {
      comments: {
        comURL: data.comments.comURL,
        comBody: data.comments.comBody,
      },
    },
  };

  const query = {
    // forumId: data.forumId,
    forumId: "8044925985855227",
  };

  const id = ObjectID("5f4427faeef08d0698235365");

  console.log(data);
  ForumPost.findByIdAndUpdate(
    // the id of the item to find
    data._id,

    // the change to be made. Mongoose will smartly combine your existing
    // document with this change, which allows for partial updates too
    update,

    // an option that asks mongoose to return the updated version
    // of the document instead of the pre-updated one.
    { new: true },

    // the callback function
    (err, todo) => {
      // Handle any possible database errors
      if (err) return res.status(500).send(err);
      return res.send(todo);
    }
  );
});

module.exports = router;
