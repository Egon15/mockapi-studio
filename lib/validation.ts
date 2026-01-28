import { z } from "zod";

export const settingsSchema = z.object({
  delayMs: z.number().nonnegative(),
  statusCode: z.number().int(),
  headers: z.record(z.string(), z.string()).optional(),
});
