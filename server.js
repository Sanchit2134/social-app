import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import dbConnect from "./src/lib/connectDB.js";
import PostsModel from "./src/models/posts.model.js";
import mongoose from "mongoose";
import CommentsModel from "./src/models/comment.model.js";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();
let serverSocket;
app.prepare().then(() => {
  dbConnect();
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    serverSocket = socket;
    console.log("a user connected", socket.id);

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("likepost", async (data) => {
      const post = await PostsModel.findById(data.postId);
      let response;
      if (post?.toJSON()?.likes.map((id) => id.toString()).includes(data.userId)) response = await PostsModel.findByIdAndUpdate(data.postId, { $pull: { likes: data.userId } });
      else response = await PostsModel.findByIdAndUpdate(data.postId, { $push: { likes: data.userId } });
      if (response) io.emit("updatePost", { postId: data.postId });
    })

    socket.on("commentpost", async (data) => {
      console.log('data: ', data);
      const response = await CommentsModel.create(data);
      const post = await PostsModel.findByIdAndUpdate(data.postId, { $push: { comments: response._id } });
      const postWithComment = await PostsModel.findById(data.postId).populate('comments');
      if (response) io.emit("updateComment", postWithComment);
    })


    socket.on("chat", (msg) => {
      console.log("message: " + msg);
      io.emit("chat", msg);
    });
  });



  httpServer.once("error", (err) => {
    console.error(err);
    process.exit(1);
  }).listen(port, () => {
    console.log(`----> Ready on http://${hostname}:${port}`);
  });
});

export { serverSocket };