import { type ZodError, z } from "zod";

type ActionError = {
  msg: string;
  pretty?: string | undefined;
};

function parseZodError(error: ZodError): ActionError {
  return {
    msg: "Validation error",
    pretty: z.prettifyError(error),
  };
}

export { type ActionError, parseZodError };
