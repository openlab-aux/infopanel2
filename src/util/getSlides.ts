import { readItems } from "@directus/sdk";
import { directusClient } from "./directus";
import type { Slide } from "../types/slide";
import markdownIt from "markdown-it";
import { DIRECTUS_URL } from "astro:env/server";

export default async function getSlides(options: {
  includeUnpublished?: boolean;
  includeInactive?: boolean;
}): Promise<Slide[]> {
  const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  });

  const filter = {
    ...(options.includeUnpublished ? {} : { status: { _eq: "published" } }),
    ...(options.includeInactive
      ? {}
      : {
          not_before: {
            _or: [{ _lt: new Date().toISOString() }, { _eq: null }],
          },
          not_after: {
            _or: [{ _gt: new Date().toISOString() }, { _eq: null }],
          },
        }),
  };

  return directusClient
    .request(
      readItems("Infopanel_Slides", {
        sort: ["sort"],
        filter,
      }),
    )
    .then((items) => {
      return items.map((item) => {
        return {
          id: item.id,
          title: item.Title,
          content: md.render(item.Content),
          image: item.image
            ? `${DIRECTUS_URL}/assets/${item.image}`
            : undefined,
          duration: item.Duration,
        } as Slide;
      });
    });
}
