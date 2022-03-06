import express from "express";
import morgan from "morgan";

const PORT = 3000;

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
  return res.send("test");
});

app.get("/login", (req, res) => {
  return res.send("login");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} 🚀`);
});

