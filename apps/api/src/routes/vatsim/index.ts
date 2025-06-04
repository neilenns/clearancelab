import { Router } from "express";
import flightplanRoutes from "./flightplan/index.js";
import testRoutes from "./test.js";

const router = Router();

router.use("/flightplan", flightplanRoutes);
router.use("/test", testRoutes);

export default router;
