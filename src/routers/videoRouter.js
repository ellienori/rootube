import express from "express";
import { watch, getEdit, postEdit, deleteVideo, getUpload, postUpload } from "../controllers/videoController";
import { loggedInUserOnlyMiddleware, videoUpload } from "../middlewares";

const videoRouter = express.Router();

videoRouter.route("/upload").all(loggedInUserOnlyMiddleware).get(getUpload).post(videoUpload.single("video"), postUpload);
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(loggedInUserOnlyMiddleware).get(getEdit).post(postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", loggedInUserOnlyMiddleware, deleteVideo);

export default videoRouter;