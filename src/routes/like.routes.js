import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAllLikedVideos, toggleCommentLike, togglePostLike, toggleVideoLike } from "../controllers/like.controllers.js";

const router = Router();

router.use(verifyJWT);
router.route("/to/:videoId").post(toggleVideoLike);
router.route("/c/:commentId").post(toggleCommentLike);
router.route("/p/:postId").post(togglePostLike);
router.route("/like_videos").get(getAllLikedVideos);


export default router;