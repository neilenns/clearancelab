import { DeleteScenarioResponse } from "@workspace/validators";
import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import { verifyUser } from "../../middleware/permissions.js";
import { ScenarioModel } from "../../models/scenario.js";

const router = Router();

router.delete(
  "/:id",
  verifyUser,
  async (request: Request, response: Response) => {
    const { id } = request.params;
    const isValid = mongoose.isValidObjectId(id);

    if (!isValid) {
      const deleteResponse: DeleteScenarioResponse = {
        success: false,
        message: `Invalid scenario ID ${id}.`,
      };

      console.error(`Invalid scenario ID ${id}`);
      response.status(404).json(deleteResponse);
      return;
    }

    try {
      const deletedScenario = await ScenarioModel.findByIdAndDelete(id);

      if (!deletedScenario) {
        const deleteResponse: DeleteScenarioResponse = {
          success: false,
          message: `Scenario with ID ${id} not found.`,
        };

        console.error(`Scenario with ID ${id} not found, couldn't delete it.`);
        response.status(404).json(deleteResponse);
        return;
      }

      const deleteResponse: DeleteScenarioResponse = {
        success: true,
      };

      response.status(204).json(deleteResponse);
    } catch (error) {
      const deleteResponse: DeleteScenarioResponse = {
        success: false,
        message: "An error occurred while trying to delete the scenario.",
      };

      console.error("Error deleting scenario:", error);
      response.status(500).json(deleteResponse);
      return;
    }
  },
);

export default router;
