const userModel = require("../model/userModel");
const postModel = require("../model/postModel");
const commentModel = require("../model/comment");
const mongoose = require("mongoose");

const createComment = async (req, res) => {
	try {
		const likeComment = await commentModel.findByIdAndUpdate(
			req.params.comment,
			{
				$push: { like: req.params.id },
			},
			{ new: true }
		);

		res.status(201).json({ message: "comment Liked", data: likeComment });
		// }
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const deleteComment = async (req, res) => {
	try {
		const likeComment = await commentModel.findByIdAndUpdate(
			req.params.comment,
			{
				$pull: { like: req.params.id },
			},
			{ new: true }
		);

		res.status(201).json({ message: "Liked Deleted", data: likeComment });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

module.exports = {
	deleteComment,
	createComment,
};
