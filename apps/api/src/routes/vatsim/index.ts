import { Router } from "express";
import flightplanRoutes from "./flightplan/index.js";

const router = Router();

router.use("/flightplan", flightplanRoutes);

export default router;
