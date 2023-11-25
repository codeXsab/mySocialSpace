import express from "express";
import {
  testLikes,
  getLikes,
  likePost,
  unlikePost,
} from "../controllers/likes.js";

const router = express.Router();

router.get("/test", testLikes);
router.get("/", getLikes);
router.post("/", likePost);
router.delete("/", unlikePost);

export default router;
