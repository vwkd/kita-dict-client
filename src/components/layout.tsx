import { ComponentChildren } from "preact";
import { Head } from "$fresh/runtime.ts";
import SearchBox from "./searchbox.tsx";
import NavButton from "./navbutton.tsx";

export default function Layout(
  { url, children }: { url: string; children: ComponentChildren },
) {
  const u = url ? new URL(url) : undefined;
  const pathname = u?.pathname;
  const query = u?.searchParams.get("q") || "";

  return (
    <body class="flex-1 max-w-[min(95vw,768px)] mx-auto pb-4 flex flex-col gap-4 bg-white dark:bg-gray-900 text-slate-800 dark:text-gray-300">
      <MyHead />
      <Navigation query={query} pathname={pathname} />
      <div class="flex-1 min-h-0 flex flex-col">
        {children}
      </div>
    </body>
  );
}

function MyHead() {
  return (
    <Head>
      <title>Kita</title>
      <meta
        content="Georgian German dictionary"
        name="Kita Dict"
      />
    </Head>
  );
}

function Navigation({ query, pathname }: { query: string; pathname: string }) {
  return (
    <nav class="border-b border-slate-300 dark:border-gray-700 text-slate-500 dark:text-gray-600 flex">
      <ul class="flex-1 px-2 py-2 gap-3 flex items-center">
        <NavButton href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style="fill: none; stroke-width:1.5; stroke: currentColor;"
            class="w-8 h-8"
          >
            <title>Home</title>
            <path
              style="stroke-linecap: round; stroke-linejoin: round; d: path('M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25');"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </NavButton>
        <li class="flex-1 flex">
          <SearchBox query={query} pathname={pathname} />
        </li>
        <NavButton href="/reference">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style="fill: none; stroke-width:1.5; stroke: currentColor;"
            class="w-8 h-8"
          >
            <title>Reference</title>
            <path
              style="stroke-linecap: round; stroke-linejoin: round; d: path('M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z');"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
        </NavButton>
      </ul>
    </nav>
  );
}
