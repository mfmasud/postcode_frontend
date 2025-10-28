"use server";

import { type ActionError, parseZodError } from "@/schemas/error/ActionError";
import {
  type HealthResponse,
  HealthResponseSchema,
} from "@/schemas/backend/healthResponse.schema";

// State type for health status (returned by the action)
export type HealthState = {
  success: boolean;
  error?: ActionError;
  data?: HealthResponse;
};

// Server Action compatible with useActionState
export async function healthAction(
  _prevState: HealthState,
  _formData: FormData
): Promise<HealthState> {
  try {
    // Call the backend API
    const response = await fetch(`http://${process.env.BACKEND_URL}/health`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        success: false,
        error: {
          msg: "Failed to fetch health",
          pretty: undefined,
        },
      };
    }

    const data = await response.json();
    const validatedData = HealthResponseSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        success: false,
        error: parseZodError(validatedData.error),
      };
    }

    return {
      success: true,
      data: validatedData.data,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        msg:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        pretty: undefined,
      },
    };
  }
}
