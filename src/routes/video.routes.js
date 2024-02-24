import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { publishAVideo, updateVideoDetails } from "../controllers/video.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/upload-video").post(
  verifyJWT,
  upload.fields([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  publishAVideo
);
router.route("/:videoId").patch(verifyJWT, updateVideoDetails)

export default router;