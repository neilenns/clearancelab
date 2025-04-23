import { z } from "zod";

export const formSchema = z.object({
  cid: z.string(),
});
