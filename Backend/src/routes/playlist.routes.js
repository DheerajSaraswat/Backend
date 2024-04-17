import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { addVideoToPlaylist, createPlaylist, deletePlaylist, getPlaylistById, getUserPlaylist, removeVideoFromPlaylist, updatePlaylist } from "../controllers/playlist.controllers.js";

const router = Router();


router.route("/").post(verifyJWT, createPlaylist)
router.route("/:userId").get(getUserPlaylist)
router.route("/id/:playlistId").get(getPlaylistById)
router.route("/add/:videoId/to/:playlistId").patch(addVideoToPlaylist)
router.route("/remove/:videoId/from/:playlistId").post(removeVideoFromPlaylist)
router.route("/delete/:playlistId").delete(deletePlaylist)
router.route("/edit/:playlistId").patch(updatePlaylist)

export default router;