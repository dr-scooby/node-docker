const express = require("express");

const postController = require("../controllers/postController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

// when user goes to the post endpoint and tries to post something, protect is called, checks if user
// is in session or logged in, if so, then go to next method postController.createPost
// url endpoint:>  localhost:3000/
router.route("/").get(postController.getAllPosts).post(protect, postController.createPost);
// we can allow to get one post by id, but update, delete will be protected, user has to be signed in
router.route("/:id").get(postController.getOnePost).patch(protect, postController.updatePost).delete(protect, postController.deletePost);

module.exports = router;