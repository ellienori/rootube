import express from "express";
import { getEdit, postEdit, profile, logout, startGithubLogin, finishGithubLogin, getChangePassword, postChangePassword } from "../controllers/userController";
import { loggedInUserOnlyMiddleware, publicOnlyMiddleware, avatarUpload } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", loggedInUserOnlyMiddleware, logout);
userRouter.get("/:id([0-9a-f]{24})", profile);
userRouter.route("/edit").all(loggedInUserOnlyMiddleware).get(getEdit).post(avatarUpload.single("avatar"), postEdit);
userRouter.route("/change-password").all(loggedInUserOnlyMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);

export default userRouter;