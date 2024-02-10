import { Router } from "express";
import {
  loginUser,
  userRegister,
  logout,
  refreshAccessToken,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: 'avatar',
            maxCount: 1,
        }, {
            name: 'coverImage',
            maxCount: 1
        }
    ]),
    userRegister
    );

router.route('/login').post(loginUser)

router.route('/logOut').post(verifyJWT, logout)

router.route('/refresh-token').post(refreshAccessToken)

export default router;
