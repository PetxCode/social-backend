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
			req.params.followerID,
			{
				$push: { follower: req.params.followingID },
			},
			{ new: true }
		);
		await userModel.findByIdAndUpdate(
			req.params.followingID,
			{
				$push: { follower: req.params.followerID },
			},
			{ new: true }
		);

		res.status(201).json({ message: "You are now following" });
		// }
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const deleteFollow = async (req, res) => {
	try {
		const likedBefore = await userModel.findById(req.params.id);

		// if (likedBefore) {
		// 	res.status(201).json({ message: "You've already Liked Before" });
		// } else {
		await userModel.findByIdAndUpdate(
			req.params.followerID,
			{
				$pull: { follower: req.params.followingID },
			},
			{ new: true }
		);

		await userModel.findByIdAndUpdate(
			req.params.followingID,
			{
				$pull: { following: req.params.followerID },
			},
			{ new: true }
		);

		res.status(201).json({ message: "You are no more following" });
		// }
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

module.exports = {
	createFollow,
	deleteFollow,
};
