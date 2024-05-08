import mongoose, { Schema } from "mongoose";

const CommentSchema = mongoose.Schema(
    {
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        postID: {
            type: Schema.Types.ObjectId,
            ref: 'posts'
        },
        text: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
    }
);

const CommentsModel = mongoose.models?.comments || mongoose.model('comments', CommentSchema);

export default CommentsModel;