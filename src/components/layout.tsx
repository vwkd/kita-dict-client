import { ComponentChildren } from "preact";
import SearchBox from "./searchbox.tsx";
import NavButton from "./navbutton.tsx";

export default function Page(
  { url, children }: { url: string; children: ComponentChildren },
) {
  const u = url ? new URL(url) : undefined;
  const pathname = u?.pathname;
  const query = u?.searchParams.get("q") || "";

  return (
    <body class="px-5 py-3 max-w-screen-sm mx-auto flex flex-col gap-5 items-center bg-white dark:bg-black text-gray-800 dark:text-gray-300">
      <nav class="self-stretch flex-1 flex flex-wrap gap-5 items-center justify-center">
        <NavButton href="/" title="Home" />
        <NavButton href="/reference" title="Reference" />
        <SearchBox query={query} pathname={pathname} />
      </nav>
      {children}
    </body>
  );
}
