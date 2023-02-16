export default function NavButton(
  { href, title }: { href: string; title: string },
) {
  return (
    <a
      href={href}
      class="px-3 py-2 dark:bg-gray-800 border dark:border-none border-slate-300 rounded-md placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
    >
      {title}
    </a>
  );
}
