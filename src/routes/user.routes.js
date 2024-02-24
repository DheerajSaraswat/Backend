import { Router } from "express";
import {
  loginUser,
  userRegister,
  logout,
  refreshAccessToken,
  changePassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserProfileDetail,
  getWatchHistory,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  userRegister
);

router.route("/login").post(loginUser);

router.route("/logOut").post(verifyJWT, logout);

router.route("/refresh-token").post(refreshAccessToken);

router.route("/update-pass").post(verifyJWT, changePassword);

router.route("/currentUser").get(verifyJWT, getCurrentUser);

router.route('/update-account').patch(verifyJWT, updateAccountDetails);

router.route('/update-avatar').patch(verifyJWT, upload.single('avatar'), updateUserAvatar);

router.route('/update-coverImage').patch(verifyJWT, upload.single('coverImage', updateUserCoverImage));

router.route('/ch/:username').get(verifyJWT, getUserProfileDetail);

router.route('/watchHistory').get(verifyJWT, getWatchHistory);

export default router;
