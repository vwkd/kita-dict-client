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
      <main class="flex-1 flex flex-col gap-10">
        <header class="flex flex-col gap-3">
          <h1 class="text-5xl font-semibold text-slate-500 dark:text-gray-600">
            Kita Dict
          </h1>
        </header>
        <section class="flex flex-col gap-3">
          <p>
            A Georgian German dictionary with over 60.000 entries.
          </p>
          <p>
            It is a work in progress - see status below.
          </p>
        </section>
        <section class="flex flex-col gap-3">
          <h2 class="text-2xl font-semibold text-slate-500 dark:text-gray-600">
            Status
          </h2>
          <div class="flex flex-col">
            <h3 class="text-lg font-semibold text-slate-500 dark:text-gray-600">
              Entries
            </h3>
            <p>{entries}</p>
          </div>
          <div class="flex flex-col">
            <h3 class="text-lg font-semibold text-slate-500 dark:text-gray-600">
              Progress
            </h3>
            <p>{`${progress}%`}</p>
            <p>{`(${pages}/${pagesTotal} pages)`}</p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
