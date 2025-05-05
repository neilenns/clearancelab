import { z } from "zod";

// Pagination schema
export const paginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total_pages: z.number(),
  total_items: z.number(),
});
