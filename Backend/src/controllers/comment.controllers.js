import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {Comment} from "../models/comment.models.js"
import mongoose from "mongoose"


const addComment = asyncHandler( async (req, res)=>{
    const {content, postId} = req.body
    const {videoId} = req.params
    if(!content || !videoId){
        throw new ApiError(400, "Comment or videoId was not provided.")
    }
    const addCommentToVideoOrPost = await Comment.create({
        owner: req.user._id,
        content,
        video: videoId?videoId:null,
        post: postId?postId:null,
    })
    if(!addCommentToVideoOrPost){
        throw new ApiError(400, "Comment is not added to database.")
    }
    return res
           .status(200)
           .json(new ApiResponse(200, addCommentToVideoOrPost, "Comment is successfully created."))
} )

const getVideoComments = asyncHandler( async(req, res)=>{
    const {videoId} = req.params
    const { page = 1, limit = 10 } = req.query;
    const videoComments = await Comment.aggregate([
        {
            $match: {
                video: new mongoose.Types.ObjectId(videoId),
            }
        },
        {
            $skip: (page-1)*limit,
        },
        {
            $limit: limit,
        },
        {
            $project:{
                createdAt: 1,
                owner: 1,
                content: 1
            }
        }
    ])
    return res
           .status(200)
           .json(new ApiResponse(200, videoComments,"All video comments are fetched."))
} )

const updateComment = asyncHandler( async(req, res)=>{
    const {commentId} = req.params
    const {content} = req.body
    const comment = await Comment.findByIdAndUpdate(
        commentId,
        {
            content,
        }
    )
    return res
           .status(200)
           .json(new ApiResponse(200, comment, "Comment is successfully updated."))
} )

const deleteComment = asyncHandler(async(req,res)=>{
    const {commentId} = req.params
    const comment = await Comment.findByIdAndDelete(
        commentId
    )
    return res
           .status(200)
           .json(new ApiResponse(200, comment, "Comment is successfully deleted."))

}) 

export {
    addComment,
    getVideoComments,
    updateComment,
    deleteComment
}