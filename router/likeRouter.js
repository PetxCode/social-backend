const { createFollow } = require("../controller/followController");

const express = require("express");
const router = express.Router();

router.route("/:follower/:following").post(createFollow);

// router.route("/:id/:post").delete(deletePost);

module.exports = router;
