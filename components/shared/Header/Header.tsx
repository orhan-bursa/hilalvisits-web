"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { babylonica } from "@/utils/fonts";

import "./styles.css";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="w-max h-40 mx-auto bg-white sticky top-0 z-[120] border-b-2 p-2 pt-0">
      <h1
        className={
          babylonica.className +
          " " +
          "text-[100px] text-amber-400 cursor-pointer whitespace-nowrap "
        }
      > Hilal Visits </h1>
    </header>
  );
}

