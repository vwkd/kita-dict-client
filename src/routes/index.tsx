const SERVER_URL = "http://vwkd-kita-dict-server.deno.dev/status";

export const handler = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const q = url.searchParams.get("q");
    
    // note: deprecated legacy queries on root
    if (q !== null) {
      return new Response("Use /results endpoint", {
        status: 301,
        headers: { location: `/results${url.search}` },
      });
    }

    const res = await fetch(SERVER_URL);
    const status = await res.json();

    return ctx.render({ status });
  },
};

export default function Page({ data }) {
  const { book, last_page } = data.status;

  return (
    <body class="px-5 py-3 flex flex-col gap-5 items-center">
      <h1 class="text-3xl font-semibold">Kita Dict</h1>
      <div class="flex flex-col">
        <h2 class="text-lg font-semibold">Progress Status</h2>
        <div class="flex gap-2">
          <h3>Book</h3>
          <p>{book}</p>
        </div>
        <div class="flex gap-2">
          <h3>Page</h3>
          <p>{last_page}</p>
        </div>
      </div>
    </body>
  );
}
