const {
	deleteFollow,
	createFollow,
} = require("../controller/followController");
const verified = require("../utils/verified");

const express = require("express");
const router = express.Router();

router.route("/:followingID/:followerID").patch(createFollow);

router.route("/:followingID/:followerID").delete(deleteFollow);

module.exports = router;
