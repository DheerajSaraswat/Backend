import { Like } from "../models/like.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const user = await Like.findOne({
    likedBy: req.user._id,
  });
  const video = await Like.findOne({
    videos: videoId,
  });
  let toggleLike;
  if (user) {
    if(video){
    toggleLike = await Like.findOneAndUpdate(
       {
         likedBy: req.user._id,
       },
       {
         $pull: {
           videos: videoId,
         },
       },
       {
         new: true,
       }
     )
    } else {
    toggleLike = await Like.findOneAndUpdate(
      {
        likedBy: req.user._id,
      },
      {
        $push: {
          videos: video,
        },
      },
      {
        new: true,
      }
    );
  }
  } else {
    toggleLike = await Like.create({
      videos: videoId,
      likedBy: req.user._id,
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
  const comment = await Like.findOne({
    comments: commentId
  })
  console.log(comment);
  if (user) {
    if(comment){
      toggleComment = await Like.findOneAndUpdate(
        {
          likedBy: req.user._id,
        },
        {
          $pull: {
            comments: commentId,
          },
        },
        {
          new: 1,
        }
      );
    } else {
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
  }
  } else {
    toggleComment = await Like.create({
      comments: commentId,
      likedBy: req.user._id,
    })
    // console.log(toggleComment);
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
  const post = await Like.findOne({
    posts: postId
  })
  let togglePost;
  if(user){
    if(post){
      togglePost = await Like.findOneAndUpdate(
        {
          likedBy: req.user._id
        },
        {
          $pull: {
            posts: postId
          }
        },
        {
          new: 1
        }
      )
    } else {
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
  }
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
