import { Router } from "express";
import deleteMethod from "./delete.js";
import getMethod from "./get.js";
import postMethod from "./post.js";
import putMethod from "./put.js";
import summaryRouter from "./summary/index.js";

const router = Router();

router.use("/", putMethod);
router.use("/", postMethod);
router.use("/", deleteMethod);
router.use("/", getMethod);
router.use("/summary", summaryRouter);

export default router;
