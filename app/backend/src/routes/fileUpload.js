import express from "express";
import { fileUpload, testFileUpload } from "../controllers/fileUpload.js";

const router = express.Router();

router.post("/", fileUpload);

export default router;
