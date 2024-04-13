import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addComment, deleteComment, getVideoComments, updateComment } from "../controllers/comment.controllers.js";

const router = Router();

router.route("/add-comment/:videoId").post(verifyJWT, addComment)

router.route("/:videoId").get(verifyJWT, getVideoComments)

router.route("/edit/:commentId").patch(verifyJWT, updateComment)

router.route("/delete/:commentId").delete(verifyJWT, deleteComment)

export default router;