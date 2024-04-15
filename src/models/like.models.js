import mongoose, { mongo } from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    comments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    videos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    }],
    posts: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    },
    likedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export const Like = mongoose.model("Like", likeSchema)
