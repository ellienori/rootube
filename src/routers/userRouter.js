import express from "express";
import { getEdit, postEdit, profile, logout, startGithubLogin, finishGithubLogin, getChangePassword, postChangePassword } from "../controllers/userController";
import { loggedInUserOnlyMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", loggedInUserOnlyMiddleware, logout);
userRouter.get("/:id(\\d+)", profile);
userRouter.route("/edit").all(loggedInUserOnlyMiddleware).get(getEdit).post(postEdit);
userRouter.route("/change-password").all(loggedInUserOnlyMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);

export default userRouter;