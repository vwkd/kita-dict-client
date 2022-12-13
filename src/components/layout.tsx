export default function Page({ children }) {
  return (
    <body class="px-5 py-3 max-w-screen-sm mx-auto flex flex-col gap-5 items-center dark:bg-black dark:text-slate-200">
      <nav class="flex gap-3 text-blue-600">
        <a href="/">Home</a>
        <a href="/results?q=.">Results</a>
        <a href="/reference">Reference</a>
      </nav>
      {children}
    </body>
  );
}
