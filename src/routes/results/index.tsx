import { renderMarkdown } from "$lib/utils.ts";
import Layout from "$components/layout.tsx";
import type { Handlers, PageProps } from "$fresh/server.ts";

const SERVER_URL = "http://vwkd-kita-dict-server.deno.dev/results";

type Results = string[][];

export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const q = url.searchParams.get("q");

    if (q === null) {
      return new Response("Missing query parameter", { status: 400 });
    }

    const urlServer = new URL(SERVER_URL);
    urlServer.searchParams.set("q", q);

    const res = await fetch(urlServer);
    const results: Results = await res.json();

    return ctx.render({ results });
  },
};

export default function Page({ url, data }: PageProps<{ results: Results }>) {
  const u = new URL(url);
  const results = data.results;

  if (!results.length) {
    return (
      <Layout url={u.toString()}>
        <p>No results found.</p>
      </Layout>
    );
  }

  return (
    <Layout url={u.toString()}>
      <h1 class="text-3xl font-semibold">Results</h1>
      <ul class="flex flex-col">
        {results.map((sublines) => {
          if (sublines.length > 1) {
            return (
              <li class="flex flex-col">
                <ul class="flex flex-col">
                  {sublines.map((subline, i) => {
                    const html = renderMarkdown(subline);

                    return (
                      <li
                        class={`${i > 0 ? "ml-2" : ""}`}
                      >
                        <p dangerouslySetInnerHTML={{ __html: html }}></p>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          } else {
            const html = renderMarkdown(sublines[0]);
            return (
              <li>
                <p
                  dangerouslySetInnerHTML={{ __html: html }}
                  style="text-indent: -0.5rem; padding-left: 0.5rem;"
                >
                </p>
              </li>
            );
          }
        })}
      </ul>
    </Layout>
  );
}
