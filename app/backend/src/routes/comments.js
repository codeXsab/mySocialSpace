import express from "express";

import {
  addComments,
  getComments,
  testComments,
} from "../controllers/comments.js";

const router = express.Router();

router.get("/test", testComments);
router.get("/", getComments);
router.post("/", addComments);

export default router;
