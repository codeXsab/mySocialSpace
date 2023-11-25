import express from "express";
import userRoutes from "./src/routes/users.js";
import postRoutes from "./src/routes/posts.js";
import likeRoutes from "./src/routes/likes.js";
import commentRoutes from "./src/routes/comments.js";
import authRoutes from "./src/routes/auth.js";
import uploadRoutes from "./src/routes/fileUpload.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
const app = express();
const PORT = 8800;

//Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());

//STATIC SERVER

const staticDir = path.join(
  new URL("../client/public", import.meta.url).pathname
);
app.use(express.static(staticDir));

//ROUTES

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);

app.listen(PORT, (req, res) => {
  console.log("SERVER LISTENING ON", PORT);
});
