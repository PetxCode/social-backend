const userModel = require("../model/userModel");
const postModel = require("../model/postModel");
const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");

const createPost = async (req, res) => {
	try {
		const { message } = req.body;
		const image = await cloudinary.uploader.upload(req.file.path);

		const getUser = await userModel.findById(req.params.id);
		const postData = await new postModel({
			message,
			avatar: image.secure_url,
			avatarID: image.public_id,
		});

		postData.user = getUser;
		postData.save();

		getUser.post.push(mongoose.Types.ObjectId(postData._id));
		getUser.save();

		res.status(201).json({ message: "post created", data: postData });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const viewPosts = async (req, res) => {
	try {
		const post = await postModel.find();

		res.status(201).json({ message: "post created", data: post });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const viewPost = async (req, res) => {
	try {
		const post = await userModel.findById(req.params.id).populate("post");

		res.status(201).json({ message: "post created", data: post });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const getPost = async (req, res) => {
	try {
		const post = await postModel.findById(req.params.post);

		res.status(201).json({ message: "post is viewd", data: post });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const deletePost = async (req, res) => {
	try {
		const postData = await userModel.findById(req.params.id);
		const remove = await postModel.findByIdAndRemove(req.params.post);

		postData.post.pull(remove);
		postData.save();

		res.status(201).json({ message: "post deleted" });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

module.exports = {
	deletePost,
	createPost,
	viewPost,
	viewPosts,
	getPost,
};
