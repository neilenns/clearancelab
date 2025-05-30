import { Router } from "express";
import postMethod from "./post.js";

const router = Router();

router.use("/", postMethod);

export default router;
