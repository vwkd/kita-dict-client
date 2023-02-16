import Layout from "$components/layout.tsx";
import type { Handlers, PageProps } from "$fresh/server.ts";

const SERVER_URL = "http://vwkd-kita-dict-server.deno.dev/status";

type Status = {
  entries: number;
  progress: number;
  pages: number;
  pagesTotal: number;
};

export const handler: Handlers = {
  async GET(_req, ctx) {
    const res = await fetch(SERVER_URL);
    const status: Status = await res.json();

    return ctx.render({ status });
  },
};

export default function Page({ data }: PageProps<{ status: Status }>) {
  const { entries, progress, pages, pagesTotal } = data.status;

  return (
    <Layout>
      <h1 class="text-3xl font-semibold">Kita Dict</h1>
      <div class="flex flex-col items-center gap-3">
        <h2 class="text-2xl font-semibold">Status</h2>
        <div class="flex flex-col items-center">
          <h3 class="text-lg font-semibold">Entries</h3>
          <p>{entries}</p>
        </div>
        <div class="flex flex-col items-center">
          <h3 class="text-lg font-semibold">Progress</h3>
          <p>{`${progress}%`}</p>
          <p>{`(${pages}/${pagesTotal} pages)`}</p>
        </div>
      </div>
    </Layout>
  );
}
