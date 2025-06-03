import { verifyApiKey } from "@/middleware/apikey.js";
import { ScenarioModel } from "@models/scenario.js";
import { PlanStatisticsResponse, Statistic } from "@workspace/validators";
import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", verifyApiKey, async (request: Request, response: Response) => {
  const departures = await ScenarioModel.aggregate<Statistic>([
    { $match: { "plan.dep": { $exists: true, $nin: [undefined, ""] } } },
    { $group: { _id: "$plan.dep", count: { $sum: 1 } } },
    { $project: { _id: 0, item: "$_id", count: "$count" } },
    { $sort: { count: -1, item: 1 } }, // Sort by count descending, then item ascending
  ]);

  const destinations = await ScenarioModel.aggregate<Statistic>([
    { $match: { "plan.dest": { $exists: true, $nin: [undefined, ""] } } },
    { $group: { _id: "$plan.dest", count: { $sum: 1 } } },
    { $project: { _id: 0, item: "$_id", count: "$count" } },
    { $sort: { count: -1, item: 1 } }, // Sort by count descending, then item ascending
  ]);

  const isValid = await ScenarioModel.aggregate<Statistic>([
    {
      $group: {
        _id: {
          $cond: [
            { $eq: ["$isValid", true] },
            "Yes",
            "No",
          ],
        },
        count: { $sum: 1 },
      },
    },
    { $project: { _id: 0, item: "$_id", count: "$count" } },
    { $sort: { item: 1 } },
  ]);

  const hasAudio = await ScenarioModel.aggregate<Statistic>([
    {
      $group: {
        _id: {
          $cond: [
            { $eq: ["$hasAudio", true] },
            "Yes",
            "No",
          ],
        },
        count: { $sum: 1 },
      },
    },
    { $project: { _id: 0, item: "$_id", count: "$count" } },
    { $sort: { item: 1 } },
  ]);

  const responseData: PlanStatisticsResponse = {
    success: true,
    data: {
      departures,
      destinations,
      isValid,
      hasAudio,
    },
  };

  response.json(responseData);
});

export default router;
