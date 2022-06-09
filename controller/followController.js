const userModel = require("../model/userModel");
const postModel = require("../model/postModel");
const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");

const createFollow = async (req, res) => {
	try {
		const likedBefore = await userModel.findById(req.params.id);

		// if (likedBefore) {
		// 	res.status(201).json({ message: "You've already Liked Before" });
		// } else {
		await userModel.findByIdAndUpdate(
			req.body.follower,
			{
				$push: { follower: req.user.follower, name: "Oken" },
			},
			{ new: true }
		);

		await userModel.findByIdAndUpdate(
			req.body.following,
			{
				$push: { following: req.body.following, name: "peter" },
			},
			{ new: true }
		);

		res.status(201).json({ message: "Post Liked", data: likePost });
		// }
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const deleteFollow = async (req, res) => {
	try {
		const likePost = await postModel.findByIdAndUpdate(
			req.params.post,
			{
				$pull: { like: req.params.id },
			},
			{ new: true }
		);

		res.status(201).json({ message: "Liked Deleted", data: likePost });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

module.exports = {
	createFollow,
	deleteFollow,
};
