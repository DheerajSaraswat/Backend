import { Like } from "../models/like.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const user = await Like.findOne({
    likedBy: req.user._id,
  });
  // console.log(user)
  let toggleLike;
  if (user) {
    toggleLike = await Like.findOneAndUpdate(
      {
        likedBy: req.user._id,
      },
      {
        $push: {
          videos: videoId,
        },
      },
      {
        new: true,
      }
    );
  } else {
    toggleLike = await Like.create({
      videos: videoId ? videoId : null,
      likedBy: req.user._id,
      comments: null,
      posts: null,
    });
  }
  return res
    .status(200)
    .json(new ApiResponse(200, toggleLike, "Video like toggeling done."));
});
const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const user = await Like.findOne({
    likedBy: req.user._id,
  });
  let toggleComment;
  if (user) {
    toggleComment = await Like.findOneAndUpdate(
      {
        likedBy: req.user._id,
      },
      {
        $push: {
          comments: commentId,
        },
      },
      {
        new: 1,
      }
    );
  } else {
    toggleComment = await Like.create({
      comments: commentId,
      videos: null,
      posts: null,
      likedBy: req.user._id,
    })
    console.log(toggleComment);
    return res
           .status(200)
           .json(new ApiResponse(200, toggleComment, "Comment Like toggling done."))
  }
});
const togglePostLike = asyncHandler( async(req, res)=>{
  const {postId} = req.params
  const user = await Like.findOne({
    likedBy: req.user._id
  })
  let togglePost;
  if(user){
    togglePost = await Like.findOneAndUpdate(
      {
        likedBy: req.user._id
      },
      {
        $push: {
          posts: postId
        }
      },
      {
        new: 1
      }
    )
  } else {
    togglePost = await Like.create({
      posts: postId,
      videos: null,
      comments: null,
      likedBy: req.user._id
    })
    return res
           .status(200)
           .json(new ApiResponse(200, togglePost, "Post like toggling."))
  }

} )
const getAllLikedVideos = asyncHandler(async(req, res)=>{
  const allLikedVideos = await Like.aggregate([
    {
      $match: {
        likedBy: req.user._id
      }
    },
    {
      $unwind: "$videos"
    },
    {
      $project:{
        videos: 1
      }
    }
  ])
  if(!getAllLikedVideos){
    throw new ApiError(400, "User doesn't have any liked videos or maybe user doesn't exists.")
  }
  return res
         .status(200)
         .json(new ApiResponse(200, allLikedVideos, "Liked videos fetched"))
})

export {
  toggleVideoLike,
  toggleCommentLike,
  togglePostLike,
  getAllLikedVideos
};
