const {
	createComment,
	deleteComment,
	viewComment,
	viewComments,
	viewLimitedComment,
} = require("../controller/commentController");
const express = require("express");
const router = express.Router();

router.route("/:id/:post").post(createComment);
router.route("/comments").get(viewComments);
router.route("/:id/:post/").get(viewComment);
router.route("/:id/:post/limit").get(viewLimitedComment);
router.route("/:id/:post/:comment").delete(deleteComment);

module.exports = router;
