"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "classnames";
import "./styles.css";

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
  const pathname = usePathname();

  return (
    <header>
      <ul className="flex justify-center items-center ">
        {HEADER_ITEMS.map((item) => {
          const active = item.href == pathname;
          return (
            <li
              key={item.href}
              className={cn(
                "text-[15px] px-2 hover:text-red-500 duration-300",
                {
                  active: active,
                }
              )}
            >
              <Link href={item.href}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
}

export function VerticalNavbar() {
  const pathname = usePathname();
  return (
    <header className="mr-4">
      <ul className="flex flex-col items-center justify-center border-slate-200">
        {HEADER_ITEMS.map((item) => {
          const active = item.href == pathname;
          return (
            <li
              key={item.href}
              className={cn(
                "w-[100%] py-1 pr-4  border-r-2 text-right text-[16px] hover:text-red-500 duration-300  hover:border-red-300",
                { active: active }
              )}
            >
              <Link href={item.href}> {item.title}</Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
}
