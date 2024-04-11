import { Post } from "../models/post.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPost = asyncHandler( async(req, res)=>{
    const {content} = req.body;
    if(!content){
        throw new ApiError(400,"No data provided");
    }
    const post = await Post.create({
        owner: req.user.id,
        content,
    })
    const isPostCreated = await Post.findById(post._id)
    if(!isPostCreated){
        throw new ApiError(401, "Something went wrong during post creation.")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,isPostCreated,"Successfully created a new Post"));
} )
const updatePost = asyncHandler( async(req, res)=>{
    const {postId} = req.params
    const {content} = req.body
    const post = await Post.findByIdAndUpdate(
        postId,
        {
            $set: {
                content,
            }
        }
    )
    return res
           .status(200)
           .json(new ApiResponse(200, post, "Post updated successfully."))
} )
const deletePost = asyncHandler(async(req, res)=>{
    const {postId} = req.params
    const deletedPost = await Post.findByIdAndDelete(postId)
    if (!deletedPost) {
        throw new ApiError(404, "Post is not deleted.")
    }
    console.log(deletedPost);
    return res
           .status(200)
           .json(new ApiResponse(200, deletedPost,"Post Deleted."))
})
const getUserPosts = asyncHandler(async (req, res)=>{
    const allPosts = await Post.aggregate([
      {
        $match: {
          owner: req.user._id,
        },
      },
      {
        $project:{
            content: 1,
            createdAt: 1,
            updatedAt: 1,
        }
      }
    ]);
    if(!allPosts){
        throw new ApiError(400, "Something Went Wrong(getUserPost)")
    }
    return res
           .status(200)
           .json(new ApiResponse(200, allPosts, "All posts of the user are fetched"))
})

export {
    createPost,
    updatePost,
    deletePost,
    getUserPosts
}