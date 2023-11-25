import express from "express";

import { testPost, getPost, addPost } from "../controllers/posts.js";

const router = express.Router();

router.get("/test", testPost);
router.get("/", getPost);
router.post("/", addPost);

export default router;
