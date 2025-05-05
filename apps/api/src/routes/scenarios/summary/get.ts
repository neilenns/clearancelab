import { ScenarioSummaryResponse } from "@workspace/validators";
import { Request, Response, Router } from "express";
import { logger } from "../../../lib/logger.js";
import { verifyApiKey } from "../../../middleware/apikey.js";
import { ScenarioModel } from "../../../models/scenario.js";

const log = logger.child({ service: "scenarios" });

const router = Router();

type QueryParameters = Request<
  unknown,
  unknown,
  unknown,
  { id?: string | string[] }
>;

router.get(
  "/",
  verifyApiKey,
  async (request: QueryParameters, response: Response) => {
    const ids = request.query.id;
    const idList = Array.isArray(ids) ? ids : ids ? [ids] : [];

    try {
      const scenarios = await ScenarioModel.findSummary(idList);

      const scenarioResponse: ScenarioSummaryResponse = {
        success: true,
        data: scenarios.map((scenario) => ({
          ...scenario,
          _id: scenario._id.toString(),
        })),
      };

      response.json(scenarioResponse);
    } catch (error) {
      log.error(`Error fetching scenarios (ids: ${idList.join(", ")}):`, error);

      const scenariosResponse: ScenarioSummaryResponse = {
        success: false,
      };

      response.status(500).json(scenariosResponse);
    }
  },
);

export default router;
