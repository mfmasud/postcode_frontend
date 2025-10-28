import { z } from "zod";

/*
Typical Response:
{
    "status": "healthy",
    "timestamp": "2025-10-28T19:59:39.034Z",
    "uptime": 431881.676165018,
    "database": {
        "connected": true,
        "status": "connected"
    }
}
*/

export const HealthResponseSchema = z.object({
  status: z.enum(["healthy", "unhealthy"]),
  timestamp: z.string(),
  uptime: z.number(),
  database: z.object({
    connected: z.boolean(),
    status: z.enum(["connected", "disconnected"]),
  }),
});

export type HealthResponse = z.infer<typeof HealthResponseSchema>;
