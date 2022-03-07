import express from "express";
import { deleteUser, edit, profile, logout } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/:id(\\d+)", profile);
userRouter.get("/:id(\\d+)/edit", edit);
userRouter.get("/:id(\\d+)/delete", deleteUser);

export default userRouter;