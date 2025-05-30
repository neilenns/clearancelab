import express from "express";
import getMethod from "./get.js";

const router = express.Router();

router.use("/plans", getMethod);

export default router;
