const { deletePost, createPost } = require("../controller/likePost");

const express = require("express");
const router = express.Router();

router.route("/:id/:post").post(createPost);

router.route("/:id/:post").delete(deletePost);

module.exports = router;
