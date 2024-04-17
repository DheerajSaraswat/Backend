import { Playlist } from "../models/playlist.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const createPlaylist = asyncHandler( async(req, res)=>{
    const {name, description} = req.body
    const playlist = await Playlist.create({
        owner: req.user._id,
        name,
        description,
    })
    if(!playlist){
        throw new ApiError(400, "Something went wrong(Playlist creation)")
    }
    return res
           .status(200)
           .json(new ApiResponse(200, playlist, "Playlist Successfully Created."))
} )
const getUserPlaylist = asyncHandler( async(req, res)=>{
    const {userId} = req.params;
    const playlist = await Playlist.find({
        owner: userId
    })
    if(!playlist){
        throw new ApiError(400, "User's playlist doesn't exist.")
    }
    return res
           .status(200)
           .json(new ApiResponse(200, playlist, "Playlist Successfully fetched."))

} )
const getPlaylistById = asyncHandler(async(req, res)=>{
    const {playlistId} = req.params
    const playlist = await Playlist.findById(playlistId)
    if(!playlist){
        throw new ApiError(400, "Playlist doesn't exists.")
    }
    return res
           .status(200)
           .json(new ApiResponse(200, playlist, "Playlist fetched"))
})
const addVideoToPlaylist = asyncHandler( async(req, res)=>{
    const {videoId, playlistId} = req.params
    const videoToPlaylist = await Playlist.findByIdAndUpdate(playlistId,{
        $push:{
            videos: videoId
        }
    })
    if(!videoToPlaylist){
        throw new ApiError(400, "Video is not added to playlist")
    }
    return res
           .status(200)
           .json(new ApiResponse(200, videoToPlaylist, "Video added to Playlist"))
} )
const removeVideoFromPlaylist = asyncHandler( async(req, res)=>{
    const {videoId, playlistId} = req.params
    const removeVideo = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $pull:{
                videos: videoId
            }
        },
    )
    if(!removeVideo){
        throw new ApiError(400, "Something went wrong(remove video from playlist")
    }
    return res
           .status(200)
           .json(new ApiResponse(200, removeVideo, "Video removed from Playlist"))
} )
const deletePlaylist = asyncHandler( async(req, res)=>{
    const {playlistId} = req.params
    const playlist = await Playlist.findByIdAndDelete(playlistId)
    if(!playlist){
        throw new ApiError(400, "Playlist does not exists.")
    }
    return res
           .status(200)
           .json(new ApiResponse(200, playlist, "Playlist Deleted"))
} )
const updatePlaylist = asyncHandler( async(req, res)=>{
    const { playlistId} = req.params
    const {name, description} = req.body
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $set:{
                name,
                description,
            },
        }
    )
    return res
           .status(200)
           .json(new ApiResponse(200, updatedPlaylist, "Playlist Updated."))
} )

export {
  createPlaylist,
  getUserPlaylist,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist
};