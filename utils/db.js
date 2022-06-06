const mongoose = require("mongoose");

const url =
	"mongodb+srv://classBuild:classBuild@cluster0.75kqx.mongodb.net/socialApp?retryWrites=true&w=majority";

mongoose.connect(url).then(() => {
	console.log("database now connected...!");
});

module.exports = mongoose;
