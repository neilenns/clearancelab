import express from "express";
import destinationsRouter from "./destinations.js";

const router = express.Router();

router.use("/destinations", destinationsRouter);

export default router;
