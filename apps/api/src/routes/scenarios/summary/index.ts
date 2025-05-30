import { Router } from "express";
import getMethod from "./get.js";

const router = Router();

router.use("/", getMethod);

export default router;
