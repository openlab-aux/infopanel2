import { createDirectus, rest, staticToken } from "@directus/sdk";
import { DIRECTUS_TOKEN, DIRECTUS_URL } from "astro:env/server";

export const directusClient = createDirectus(DIRECTUS_URL)
  .with(staticToken(DIRECTUS_TOKEN))
  .with(rest());
