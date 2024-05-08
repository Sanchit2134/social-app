'use server'

import dbConnect from "@/lib/connectDB";
import PostsModel from "@/models/posts.model"

export const postAction = async (data) => {
       await dbConnect()
       await PostsModel.create(data);
}

export const getPosts = async () => {
       await dbConnect()
       const posts = await PostsModel.find().populate('comments');
       return posts.map(post => post.toJSON());
}

export const getPostById = async (id) => {
       await dbConnect()
       const post = await PostsModel.findById(id)
       return post.toJSON()
}

export const likeAction = async (data) => {
       await dbConnect();
       const post = await PostsModel.findById(data.id);
       let response;
       if (post.likes.includes(data.userId)) response = await PostsModel.findByIdAndUpdate(data.id, { $pull: { likes: data.userId } });
       else response = await PostsModel.findByIdAndUpdate(data.id, { $push: { likes: data.userId } });

       // console.log('serverSocket: ', serverSocket);
       // serverSocket.emit('like', response);
       return response?.toJSON();
}