import { ScenarioResponse } from "@workspace/validators";
import { Request, Response, Router } from "express";
import { verifyApiKey } from "../../middleware/apikey.js";
import { ScenarioModel } from "../../models/scenario.js";

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
      const scenarios = await ScenarioModel.findScenarios(idList);

      const scenarioResponse: ScenarioResponse = {
        success: true,
        data: scenarios.map((scenario) => ({
          ...scenario,
          _id: scenario._id.toString(),
        })),
      };

      response.json(scenarioResponse);
    } catch (error) {
      console.error(
        `Error fetching scenarios (ids: ${idList.join(", ")}):`,
        error,
      );

      const scenariosResponse: ScenarioResponse = {
        success: false,
        message: "Error fetching scenarios",
      };

      response.status(500).json(scenariosResponse);
    }
  },
);

export default router;
