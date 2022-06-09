const mongoose = require("mongoose");

const commentModel = mongoose.Schema(
	{
		comment: {
			type: String,
		},
		post: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "posts",
		},

		posted: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("comments", commentModel);
