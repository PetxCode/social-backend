const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");
const crypto = require("crypto");

const getUsers = async (req, res) => {
	try {
		const user = await userModel.find();
		res.status(200).json({ message: "success", data: user });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const getUser = async (req, res) => {
	try {
		const user = await userModel.findById(res.params.id);
		res.status(200).json({ message: "success", data: user });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const deleteUser = async (req, res) => {
	try {
		const user = await userModel.findByIdAndDelete(res.params.id);
		res.status(200).json({ message: "success", data: user });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const updateUser = async (req, res) => {
	try {
		const { fullName, userName } = req.body;
		const user = await userModel.findById(req.params.id);

		if (user) {
			await cloudinary.uploader.destroy(user.avatarID);
			const image = await cloudinary.uploader.upload(req.file.path);
			const user = await userModel.findByIdAndUpdate(
				res.params.id,
				{
					fullName,
					userName,
					avatar: image.secure_url,
					avatarID: image.public_id,
				},
				{ new: true }
			);
			res.status(200).json({ message: "success", data: user });
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const createUser = async (req, res) => {
	try {
		const { fullName, userName, email, password } = req.body;

		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(password, salt);
		const image = await cloudinary.uploader.upload(req.file.path);

		const getToken = crypto.randomBytes(32).toString("hex");
		const token = jwt.sign({ getToken }, "This_isTheSEcreT", {
			expiresIn: "20m",
		});

		const user = await userModel.create({
			fullName,
			userName,
			email,
			password: hashed,
			avatar: image.secure_url,
			avatarID: image.public_id,
			verifiedToken,
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
