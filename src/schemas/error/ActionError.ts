import type { ZodError } from "zod";

type ActionError = {
  msg: string;
  issues: string[] | undefined;
};

function parseZodError(error: ZodError): ActionError {
  const formatted = error.issues.map((issue) => issue.message);
  return {
    msg: "Validation error",
    issues: formatted,
  };
}

export { type ActionError, parseZodError };
