import Link from "next/link";

type HeaderItem = { title: string; href: string };
const HEADER_ITEMS: HeaderItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Photos",
    href: "/photo",
  },
  {
    title: "Albums",
    href: "/album",
  },
];

export function HorizontalNavbar() {
  return (
    <header>
      <ul className="flex justify-center items-center">
        {HEADER_ITEMS.map((item) => (
          <li className="text-xl px-2">{item.title}</li>
        ))}
      </ul>
    </header>
  );
}

export function VerticalNavbar() {
  return (
    <header>
      <ul className="pl-6 pt-2">
        {HEADER_ITEMS.reverse().map((item) => (
          <li className="text-xl flex items-center justify-center w-[100px] aspect-square -rotate-90 underline-offset-4 hover:underline hover:text-red-500">
            <Link href={item.href}> {item.title}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
