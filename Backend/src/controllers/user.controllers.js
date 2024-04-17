import { asyncHandler } from "../utils/asyncHandler.js";
import validateEmail from "../utils/emailValidator.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); // To bypass token validation on save
    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens.");
  }
};

const userRegister = asyncHandler(async (req, res) => {
  // take user details
  // validate them as in no field should be empty
  // check whether the user has its account already or not
  // if yes then send a response saying that this email is already registered
  // otherwise, store the images and avatar to the cloudinary
  // create user object- create entry in db
  // remove password and refresh token from response
  // check for user creation

  const { fullName, username, email, password } = req.body; //req.body gives access  to data sent by client and it is provided by express

  if (
    [fullName, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are required.");
  } else {
    if (validateEmail(email)) {
      console.log("Good To go");
    } else {
      console.log("Invalid email address");
      console.log(req.body);
    }
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  // As express provides req.body, similarly multer add more fields to the user req
  // console.log(req.files);
  const avatarLocalPath = req.files?.avatar[0]?.path;
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  // Image uploading on cloudinary
  const avatarUpload = await uploadOnCloudinary(avatarLocalPath);
  const coverImageUpload = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatarUpload) {
    throw new ApiError(400, "Avatar is required.");
  }

  //User object
  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    avatar: avatarUpload.url,
    coverImage: coverImageUpload?.url || "",
    email,
    password,
  });

  const isUserCreated = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!isUserCreated) {
    throw new ApiError(500, "Something went wrong in registering the user.");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, isUserCreated, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // req body -> data
  // username or email
  //find the user
  //password check
  //access and referesh token
  //send cookie

  const { username, email, password } = req.body;
  // if (!username && !email) {
  //   throw new ApiError(400, "Provide All fields");
  // }
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  console.log(user.password);
  console.log(password);
  const isPasswordValid = await user.isPasswordCorrect(password);
  console.log(isPasswordValid);
  if (!isPasswordValid) {
    throw new ApiError(401, "Incorrect Password");
  }

  const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          refreshToken,
          accessToken,
        },
        "User logged in successfully"
      )
    );
});

const logout = asyncHandler(async (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(403, "Unauthorised Request");
  }
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    if (!decodedToken) {
      throw new ApiError(402, "Invalid Refresh Token");
    }
    const user = await User.findById(decodedToken._id);
    if (!user) {
      throw new ApiError(404, "User not found.");
    }
    // Checking if the token has expired or been used before
    if (user?.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, "Invalid token.");
    }
    // Generate a new access token and save it to the database
    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken)
      .cookie("newRefreshToken", newRefreshToken)
      .json(
        new ApiResponse(
          200,
          { accessToken, newRefreshToken },
          "New Access Token generated"
        )
      );
  } catch (error) {
    throw new ApiError(403, "Invalid Token");
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.body._id);
  if (!user) {
    throw new ApiError(401, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(402, "Wrong password entered.");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Changes Successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;
  if (!fullName || !email) {
    throw new ApiError(401, "Please provide full name and email");
  }
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email,
      },
    },
    { new: true } //returns updated information
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile updated successfully!"));
});

// It's better to create different endpoints for file handling

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiError(401, "Avatar file is missing");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(200, "Failed to upload image on Cloudinary");
  }
  const updatedAvatar = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedAvatar, "Image uploaded successfully"));
});

const updateUserCoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req.file?.path;
  if (!coverImageLocalPath) {
    throw new ApiError(401, "No Cover Image provided");
  }
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  const updatedCoverImage = User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        coverImage: coverImage.url,
      },
    },
    { new: true }
  ).select("-password");

  //TODO: Delete Previous Image form cloudinary

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedCoverImage,
        "Cover Image  has been Updated Successfully"
      )
    );
});

const getUserProfileDetail = asyncHandler(async (req, res) => {
  const { username } = req.params;
  if (!username?.trim()) {
    throw new ApiError(400, "Username is required");
  }

  // here we can find details by using User.find method but after that we have to add look for id's as well which will make our code much longer so instead we will use pipeline

  const channel = await User.aggregate([
    {
      $match: {
        username: username?.toLowerCase(),
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribedTo",
      },
    },
    {
      $addFields: {
        subscribersCount: {
          $size: { $ifNull: ["$subscribers", []] },
        },
        subscribedToCount: {
          $size: { $ifNull: ["$subscriberTo", []] },
        },
        isSubscribed: {
          $cond: {
            if: { $in: [req.user?._id, "$subscribers.subscriber"] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        fullName: 1,
        username: 1,
        email: 1,
        avatar: 1,
        coverImage: 1,
        subscribersCount: 1,
        subscribedToCount: 1,
        isSubscribed: 1,
      },
    },
  ]);
  // channel gives us array in general as an output
  if (!channel?.length) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, channel[0], "Successfully fetched user data"));
});

const getWatchHistory = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistory",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  $project: {
                    fullName: 1,
                    username: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              owner: "$owner",
            },
          },
        ],
      },
    },
  ]);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user[0].watchHistory,
        "User watch history successfully fetched"
      )
    );
});

export {
  userRegister,
  loginUser,
  logout,
  refreshAccessToken,
  changePassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserProfileDetail,
  getWatchHistory,
};
