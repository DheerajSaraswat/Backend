import { asyncHandler } from "../utils/asyncHandler.js";
import validateEmail from "../utils/emailValidator.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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

export { userRegister };
