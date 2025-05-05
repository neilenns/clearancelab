import {
  ScenarioResponse,
  ScenarioSummaryResponse,
} from "@workspace/validators";
import { Request, Response, Router } from "express";
import { verifyApiKey } from "../../../middleware/apikey.js";
import { ScenarioModel } from "../../../models/scenario.js";

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
    try {
      const ids = request.query.id;
      const idList = Array.isArray(ids) ? ids : ids ? [ids] : [];

      const scenarios = await ScenarioModel.findSummary(idList);

      const scenarioResponse: ScenarioSummaryResponse = {
        success: true,
        data: scenarios.map((scenario) => ({
          ...scenario,
          _id: scenario._id.toString(),
        })),
      };

      response.json(scenarioResponse);

      return;
    } catch (error) {
      console.error("Error fetching scenarios:", error);

      const scenariosResponse: ScenarioResponse = {
        success: false,
      };

      response.status(500).json(scenariosResponse);
      return;
    }
  },
);

export default router;
