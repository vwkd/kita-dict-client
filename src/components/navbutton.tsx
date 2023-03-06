import { ComponentChildren } from "preact";

export default function NavButton(
  { href, children }: { href: string; children: ComponentChildren },
) {
  return (
    <li class="flex items-center justify-center py-2">
      <a href={href} class="flex cursor-pointer">
        {children}
      </a>
    </li>
  );
}
