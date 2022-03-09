import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/rootube")

const db = mongoose.connection;

db.on("error", (error) => console.log("❌ DB Error", error));
db.once("open", () => console.log("Connect to DB 🐝"));