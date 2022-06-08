const userModel = require("../model/userModel");
const postModel = require("../model/postModel");
const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");

const createPost = async (req, res) => {
	try {
		const likedBefore = await userModel.findById(req.params.id);

		// if (likedBefore) {
		// 	res.status(201).json({ message: "You've already Liked Before" });
		// } else {
		const likePost = await postModel.findByIdAndUpdate(
			req.params.post,
			{
				$push: { like: req.params.id },
			},
			{ new: true }
		);

		res.status(201).json({ message: "Post Liked", data: likePost });
		// }
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const deletePost = async (req, res) => {
	try {
		await postModel.findByIdAndUpdate(
			req.params.post,
			{
				$pull: { like: req.params.id },
			},
			{ new: true }
		);

		res.status(201).json({ message: "Liked Deleted" });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

module.exports = {
	deletePost,
	createPost,
};
