import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kita Dict</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <p class="my-6">Welcome to Kita Dict Client.</p>
      </div>
    </>
  );
}
