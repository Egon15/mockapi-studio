import z from "zod";

export const settingsSchema = z.object({
  delayMs: z.number().nonnegative().max(10000),
  statusCode: z.number().int().min(100).max(599),
  headers: z.record(z.string(), z.string()).optional(),
  contentType: z.enum(["application/json", "text/plain", "application/xml"]),
});
