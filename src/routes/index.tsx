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
  
      return ctx.render({ entries });
    }
  },
};

export default function Page({ data }) {
  const entries = data.entries;

  return (
    <body class="px-5 py-3 flex flex-col gap-3 items-center">
      <h1 class="text-xl font-semibold">Kita Dict Client</h1>
      <ul class="flex flex-col gap-2 max-w-screen-md">
      { entries.map((line) => {
          return (
            <li class="flex gap-3">
              <p>{line}</p>
            </li>
          );
        })
      }
      </ul>
    </body>
  );
}
