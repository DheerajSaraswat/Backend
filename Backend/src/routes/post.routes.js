import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {createPost, deletePost, getUserPosts, updatePost} from "../controllers/post.controllers.js"

const router = Router();

router.route("/create-post").post(verifyJWT, createPost);

router.route("/edit-post/:postId").patch(verifyJWT, updatePost);

router.route("/delete-post/:postId").delete(verifyJWT, deletePost);

router.route("/get_all_posts").get(verifyJWT, getUserPosts);

export default router;