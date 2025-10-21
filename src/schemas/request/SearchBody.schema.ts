import { z } from "zod";

const UK_POSTCODE_REGEX =
  /^[A-Z]{1,2}[0-9R][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$/i;

export const SearchBodySchema = z.object({
  postcode: z.string().regex(UK_POSTCODE_REGEX, "Invalid UK postcode format"),
});

export function validatePostcode(postcode: string): string {
  return postcode.toUpperCase().trim();
}
