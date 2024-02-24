import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { Video } from "../models/video.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const videPath = req.files?.videoFile[0]?.path;
  const thumbnailPath = req.files?.thumbnail[0]?.path;
  if (!videPath || !thumbnailPath) {
    throw new ApiError(400, "Provide valid image or video.");
  }
  const owner = req.user._id;
  const videoFile = await uploadOnCloudinary(videPath); // Upload the video
  const thumbnailFile = await uploadOnCloudinary(thumbnailPath); // Upload the thumbnail
  if (!videoFile || !thumbnailFile) {
    throw new ApiError(
      401,
      "Something went wrong while uploading on cloudinary."
    );
  }
  const userVideo = await Video.create({
    owner,
    title,
    description,
    duration: videoFile.duration,
    videoFile: videoFile?.secure_url,
    thumbnail: thumbnailFile?.secure_url,
  });
  const isVideoUploaded = await Video.findById(userVideo._id);
  if (!isVideoUploaded) {
    throw new ApiError(402, "Failed to save video in database");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        isVideoUploaded,
        "Video has been uploaded successfully."
      )
    );
});
const updateVideoDetails = asyncHandler(async (req, res) => {
    
    const {title, description} = req.body
    const video = await Video.findByIdAndUpdate(
      req.params.videoId,
      {
        $set:{
          title,
          description
        }
      },
      {new: true} //return the updated document
    )
    return res
    .status(200)
    .json(new ApiResponse(200, video,"Video details have been updated"))
});

export { publishAVideo, updateVideoDetails };
