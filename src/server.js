import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";
import apiRouter from "./routers/apiRouter";

const app = express();

// ffmpeg.wasm을 사용하기 위해 corss-origin- 어쩌구를 위함
app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

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

app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "credentialless");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

app.use(flash()); // flash message
app.use(localsMiddleware);
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static("assets"));
app.use("/static", express.static("node_modules/@ffmpeg/core/dist"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);

export default app;