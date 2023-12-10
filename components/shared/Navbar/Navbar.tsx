"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "classnames";
import { babylonica } from "@/utils/fonts";

import "./styles.css";
import { NAVBAR_ITEMS } from "@/constants/navbar";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="h-[100px] w-full cursor-pointer border-b-2">
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
          {NAVBAR_ITEMS.map((item, i) => {
            const active = item.href == pathname;
            return (
              <li
                key={item.href + i}
                className={cn(
                  "text-[14px] mx-3 mt-1 hover:border-b-2 text-gray-700",
                  "hover:font-semibold duration-300 hover:border-red-500 hover:text-red-500",
                  { active: active }
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

