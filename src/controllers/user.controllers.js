import { asyncHandler } from "../utils/asyncHandler.js";
import validateEmail from "../utils/emailValidator.js";
import {ApiError} from '../utils/ApiError.js';
import { User } from "../models/user.models.js";

const userRegister = asyncHandler(async (req, res) => {
  // take user details
  // validate them as in no field should be empty
  // check whether the user has its account already or not
  // if yes then send a response saying that this email is already registered
  // otherwise, store the images and avatar to the cloudinary
  // create user object- create entry in db
  // remove password and refresh token from response
  // check for user creation

  const { fullName, username, email, password } = req.body;

  if ( [fullName, username, email, password].some( (field) => field?.trim() === "" ) ) {

    throw new ApiError(400, "All Fields are required.")

  } else {
    
    if (validateEmail(email)) {
      console.log('Good To go');
    } else {
      console.log('Invalid email address');
      console.log(req.body);
    }
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

});

export { userRegister };
