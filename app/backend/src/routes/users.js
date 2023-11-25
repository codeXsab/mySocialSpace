import express from "express";

import { testUser, getUser } from "../controllers/users.js";

const router = express.Router();

router.get("/test", testUser);
router.get("/find/:userID", getUser);

export default router;
