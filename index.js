const express = require("express");
const cors = require("cors");
require("./utils/db");
const port = process.env.PORT || 3322;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).json({ message: "This is start up point...!" });
});

app.use("/api/user", require("./router/userRouter"));
app.use("/api/post", require("./router/postRouter"));
app.use("/api/like", require("./router/likeRouter"));
app.use("/api/follow", require("./router/followRoueter"));
app.use("/api/comment", require("./router/commentRouter"));
app.use("/api/comment/like", require("./router/commentLikeRouter"));

app.listen(port, () => {
	console.log("server is now listening...!");
});
