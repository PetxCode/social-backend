const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const postModel = require("../model/postModel");
const commentModel = require("../model/comment");

const createComment = async (req, res) => {
	try {
		const { comment } = req.body;
		const getUser = await userModel.findById(req.params.id);

		const getPost = await postModel.findById(req.params.post);
		const getComment = await new commentModel({
			posted: req.params.id,
			post: req.params.post,
			comment,
		});

		getComment.post = getPost;
		getComment.save();

		getPost.comment.push(mongoose.Types.ObjectId(getComment._id));
		getPost.save();

		res.status(201).json({ message: "comment created", data: getComment });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const viewComments = async (req, res) => {
	try {
		const comment = await commentModel.find();

		res.status(201).json({ message: "comments", data: comment });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const viewComment = async (req, res) => {
	try {
		const comment = await postModel.findById(req.params.post).populate({
			path: "comment",
			options: { sort: { createdAt: -1 } },
		});

		res.status(201).json({ message: "comments", data: comment });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const viewLimitedComment = async (req, res) => {
	try {
		const comment = await postModel.findById(req.params.post).populate({
			path: "comment",
			options: { sort: { createdAt: -1 }, limit: 1 },
		});

		res.status(201).json({ message: "comments", data: comment });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const deleteComment = async (req, res) => {
	try {
		const getPost = await postModel.findById(req.params.post);
		const remove = await commentModel.findByIdAndDelete(req.params.comment);

		getPost.comment.pull(remove);
		getPost.save();

		res.status(201).json({ message: "comment removed" });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

module.exports = {
	createComment,
	deleteComment,
	viewComment,
	viewComments,
	viewLimitedComment,
};
