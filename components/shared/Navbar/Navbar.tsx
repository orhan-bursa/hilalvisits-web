"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "classnames";
import { babylonica } from "@/utils/fonts";

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
    title: "Albums",
    href: "/album",
  },
  {
    title: "Photos",
    href: "/photo",
  },
  {
    title: "About",
    href: "/about",
  },
];


export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="h-[100px] w-[100%] cursor-pointer ">
      <nav className="h-[100%] flex justify-between">
        <div className="w-[400px]">
          <h1
            className={
              babylonica.className +
              " " +
              "h-[100%] flex justify-center items-center text-[80px] text-amber-400 z-50 whitespace-nowrap "
            }
          > Hilal Visits </h1>
        </div>
        <ul className="flex justify-center items-center h-10 mr-4">
          {HEADER_ITEMS.map((item) => {
            const active = item.href == pathname;
            return (
              <li
                key={item.href}
                className={cn(
                  "text-[14px] hover:font-semibold duration-300 mx-3 mt-1 hover:border-b-2 hover:border-red-500 text-gray-700 hover:text-red-500 ",
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
      </nav>
    </header>
  );
}

