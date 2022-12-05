import * as gfm from "https://deno.land/x/gfm@0.1.23/mod.ts";

const SERVER_URL = "https://vwkd-kita-dict-server.deno.dev/";

export const handler = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const q = url.searchParams.get("q");
    
    if (q === null) {
      return new Response("No query provided");
    } else {
      const urlServer = new URL(SERVER_URL);
      urlServer.searchParams.set("q", q);

      const res = await fetch(urlServer);
      const entries = await res.json();

      if (!entries.length) {
        entries.push("No results found.");
      }
  
      return ctx.render({ entries });
    }
  },
};

export default function Page({ data }) {
  const entries = data.entries;
  
  return (
    <body class="px-5 py-3 flex flex-col gap-5 items-center">
      <h1 class="text-3xl font-semibold">Kita Dict</h1>
      <ul class="flex flex-col max-w-screen-sm">
      { entries.map((line) => {
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
    </body>
  );
}
