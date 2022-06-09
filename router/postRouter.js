const {
	deletePost,
	createPost,
	viewPost,
	viewPosts,
	getPost,
} = require("../controller/postController");
const upload = require("../utils/multer");

const express = require("express");
const router = express.Router();

router.route("/:id/post").post(upload, createPost);
router.route("/posts").get(viewPosts);
router.route("/:id/post").get(viewPost);
router.route("/:post").get(getPost);
router.route("/:id/:post").delete(deletePost);

module.exports = router;
