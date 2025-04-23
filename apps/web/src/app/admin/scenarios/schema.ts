import { isValidCallsign } from "@workspace/plantools/validators";
import { z } from "zod";

export const formSchema = z.object({
  cid: z.string().refine(isValidCallsign, {
    message: "That's not a real callsign.",
  }),
});
