import {
  checkRequiredPermissions,
  verifyUser,
} from "@/middleware/permissions.js";
import { ScenarioModel } from "@models/scenario.js";
import { Permissions } from "@workspace/validators";
import express, { Request, Response } from "express";

const router = express.Router();

router.get(
  "/",
  verifyUser,
  checkRequiredPermissions(Permissions.ViewAdmin),
  async (request: Request, response: Response) => {
    const departureCounts = await ScenarioModel.aggregate([
      { $match: { "plan.dep": { $exists: true, $nin: [undefined, ""] } } },
      { $group: { _id: "$plan.dep", count: { $sum: 1 } } },
      { $project: { _id: 0, airport: "$_id", count: "$count" } },
      { $sort: { count: -1, airport: 1 } }, // Sort by count descending, then airport ascending
    ]);

    const destinationCounts = await ScenarioModel.aggregate([
      { $match: { "plan.dest": { $exists: true, $nin: [undefined, ""] } } },
      { $group: { _id: "$plan.dest", count: { $sum: 1 } } },
      { $project: { _id: 0, airport: "$_id", count: "$count" } },
      { $sort: { count: -1, airport: 1 } }, // Sort by count descending, then airport ascending
    ]);

    response.json({
      departures: departureCounts,
      destinations: destinationCounts,
    });
  },
);

export default router;
