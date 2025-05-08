import { logger } from "@lib/logger.js";
import {
  checkRequiredPermissions,
  verifyUser,
} from "@middleware/permissions.js";
import { ScenarioModel } from "@models/scenario.js";
import { DeleteScenarioResponse, Permissions } from "@workspace/validators";
import { Request, Response, Router } from "express";
import mongoose from "mongoose";

const log = logger.child({ service: "scenarios" });

const router = Router();

router.delete(
  "/:id",
  verifyUser,
  checkRequiredPermissions(Permissions.DeleteScenarios),
  async (request: Request, response: Response) => {
    const { id } = request.params;
    const isValid = mongoose.isValidObjectId(id);

    if (!isValid) {
      const deleteResponse: DeleteScenarioResponse = {
        success: false,
        message: `Invalid scenario ID ${id}.`,
      };

      log.error(`Invalid scenario ID ${id}`);
      response.status(400).json(deleteResponse);
      return;
    }

    try {
      const deletedScenario = await ScenarioModel.findByIdAndDelete(id);

      if (!deletedScenario) {
        const deleteResponse: DeleteScenarioResponse = {
          success: false,
          message: `Scenario with ID ${id} not found.`,
        };

        log.error(`Scenario with ID ${id} not found, couldn't delete it.`);
        response.status(404).json(deleteResponse);
        return;
      }

      const deleteResponse: DeleteScenarioResponse = {
        success: true,
      };

      response.status(200).json(deleteResponse);
    } catch (error) {
      const deleteResponse: DeleteScenarioResponse = {
        success: false,
        message: "An error occurred while trying to delete the scenario.",
      };

      log.error("Error deleting scenario:", error);
      response.status(500).json(deleteResponse);
    }
  },
);

export default router;
