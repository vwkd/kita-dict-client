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
      <ul class="flex flex-col gap-3 max-w-screen-sm">
      { entries.map((line) => {
        // only to make `**` bold and `*` cursive
        const html = gfm.render(line);
        return (
            <li dangerouslySetInnerHTML={{ __html: html }} class="flex gap-3"></li>
          );
        })
      }
      </ul>
    </body>
  );
}
