export default function SearchBox(
  { query, pathname }: { query: string; pathname: string },
) {
  return (
    <form
      action={pathname != "/results" ? "/results" : ""}
      class="flex-1 gap-3"
    >
      <label for="q" class="sr-only">Search</label>
      <input
        type="text"
        name="q"
        value={query ?? ""}
        placeholder="Search..."
        required
        class="px-3 py-2 dark:bg-gray-800 border dark:border-none border-slate-300 rounded-md placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
      />
    </form>
  );
}
