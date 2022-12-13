import { renderMarkdown } from "$lib/utils.ts";
import Layout from "$components/layout.tsx";
import type { Handlers, PageProps } from "$fresh/server.ts";

const SERVER_URL = "http://vwkd-kita-dict-server.deno.dev/reference";

type Reference = {
  abbreviations: string[];
  symbols: string[];
};

export const handler: Handlers = {
  async GET(_, ctx) {
    const res = await fetch(SERVER_URL);
    const reference: Reference = await res.json();

    return ctx.render({ reference });
  },
};

export default function Page({ data }: PageProps<{ reference: Reference }>) {
  const { abbreviations, symbols } = data.reference;

  return (
    <Layout>
      <h1 class="text-3xl font-semibold">Reference</h1>
      <div class="flex flex-col gap-3 items-center">
        <h2 class="text-lg font-semibold">Symbols</h2>
        <ul class="grid gap-y-1" style="grid-template-columns: 1fr 2fr">
          {symbols.map(([key, value]) => {
            return (
              <li
                class="grid"
                style="grid-column: span 2; grid-template-rows: subgrid; grid-template-columns: subgrid;"
              >
                <div>{key}</div>
                <p>{value}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div class="flex flex-col gap-3 items-center">
        <h2 class="text-lg font-semibold">Abbreviations</h2>
        <ul class="grid gap-y-1" style="grid-template-columns: 1fr 2fr">
          {abbreviations.map(([key, value]) => {
            const html = renderMarkdown(key);
            return (
              <li
                class="grid"
                style="grid-column: span 2; grid-template-rows: subgrid; grid-template-columns: subgrid;"
              >
                <div dangerouslySetInnerHTML={{ __html: html }}></div>
                <p>{value}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
}
