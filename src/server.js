import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
app.set("view engine", "pug");
app.set("views", process.cwd()+"/src/views");

app.use(morgan("dev")); // logger
app.use(express.urlencoded({extended: true}));

// Session Middleware
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false, // session을 수정할 때만 저장하자
  store: MongoStore.create({mongoUrl: process.env.DB_URL})
}));

app.use(localsMiddleware);

app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;