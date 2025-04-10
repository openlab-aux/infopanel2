import { getImage } from "astro:assets";
import type { Slide } from "../types/slide";

import { DIRECTUS_URL, DIRECTUS_TOKEN } from "astro:env/server";

export const prerender = false;

import markdownIt from "markdown-it";
import getSlides from "../util/getSlides";

const md = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
});

export async function GET() {
  const slides = await getSlides({
    includeUnpublished: false,
    includeInactive: false,
  });

  return new Response(JSON.stringify(slides, null, 2), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}
