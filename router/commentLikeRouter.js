const { deleteComment, createComment } = require("../controller/commentLike");

const express = require("express");
const router = express.Router();

router.route("/:id/:post/:comment").post(createComment);
router.route("/:id/:post/:comment").delete(deleteComment);

module.exports = router;
