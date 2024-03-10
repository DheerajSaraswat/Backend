import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  publishAVideo,
  updateVideoDetails,
  updateThumbnail,
  updateVideo,
  getVideoDetail,
  deleteVideo,
  getAllVideos
} from "../controllers/video.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/")
  .post(
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
router
  .route("/thumbnail/:videoId")
  .patch(verifyJWT, upload.single("thumbnail"), updateThumbnail);
router
  .route("/update-video/:videoId")
  .patch(verifyJWT, upload.single('videoFile'), updateVideo)
router.get("/:videoId", getVideoDetail);
router
  .route('/remove-video/:videoId')
  .delete(verifyJWT, deleteVideo);
router
  .get("/all", getAllVideos );

export default router;