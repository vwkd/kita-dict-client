import * as gfm from "gfm/mod.ts";
import Layout from "$components/layout.tsx";

const SERVER_URL = "http://vwkd-kita-dict-server.deno.dev/results";

export const handler = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const q = url.searchParams.get("q");
    
    if (q === null) {
      return new Response("Missing query parameter", { status: 400 });
    }
    
    const urlServer = new URL(SERVER_URL);
    urlServer.searchParams.set("q", q);

    const res = await fetch(urlServer);
    const results = await res.json();

    return ctx.render({ results });
  },
};

export default function Page({ data }) {
  const results = data.results;
  
  if (!results.length) {
    return (
      <Layout>
        <p>No results found.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 class="text-3xl font-semibold">Results</h1>
      <ul class="flex flex-col">
      { results.map((line) => {
          if (line.includes("\n  ")) {
            const sublines = line.split("\n  ");
          
            return (
              <li class="py-4 border-b-2 last:border-0 flex flex-col">
                <ul class="flex flex-col">
                  { sublines.map((subline, i) => {
                    // only to make `**` bold and `*` cursive
                    const html = gfm.render(subline);
                    return (
                      <li dangerouslySetInnerHTML={{ __html: html }} class={`${i > 0 ? "ml-2" : ""} ${i > 1 ? "mt-2" : ""}`}></li>
                      );
                    })
                  }
                </ul>
              </li>
            );
          } else {
            // only to make `**` bold and `*` cursive
            const html = gfm.render(line);
            return (
              <li dangerouslySetInnerHTML={{ __html: html }} class="py-4 border-b-2 last:border-0" style="text-indent: -0.5rem; padding-left: 0.5rem;"></li>
            );
          }
        })
      }
      </ul>
    </Layout>
  );
}
