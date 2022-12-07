import * as gfm from "gfm/mod.ts";
import Layout from "$components/layout.tsx";

const SERVER_URL = "http://vwkd-kita-dict-server.deno.dev/reference";

export const handler = {
  async GET(_, ctx) {

    const res = await fetch(SERVER_URL);
    const reference = await res.json();

    return ctx.render({ reference });
  },
};

export default function Page({ data }) {
  const { abbreviations, symbols } = data.reference;

  return (
    <Layout>
      <h1 class="text-3xl font-semibold">Reference</h1>
      <div class="flex flex-col gap-3 items-center">
        <h2 class="text-lg font-semibold">Symbols</h2>
        <ul class="grid gap-y-1" style="grid-template-columns: 1fr 2fr">
        { symbols.map(([key, value]) => {
            return (
              <li class="grid" style="grid-column: span 2; grid-template-rows: subgrid; grid-template-columns: subgrid;">
                <div>{key}</div>
                <p>{value}</p>
              </li>
            );
          })
        }
        </ul>
      </div>
      <div class="flex flex-col gap-3 items-center">
        <h2 class="text-lg font-semibold">Abbreviations</h2>
        <ul class="grid gap-y-1" style="grid-template-columns: 1fr 2fr">
        { abbreviations.map(([key, value]) => {
            // only to make `*` cursive
            const html = gfm.render(key);
            return (
              <li class="grid" style="grid-column: span 2; grid-template-rows: subgrid; grid-template-columns: subgrid;">
                <div dangerouslySetInnerHTML={{ __html: html }}></div>
                <p>{value}</p>
              </li>
            );
          })
        }
        </ul>
      </div>
    </Layout>
  );
}
