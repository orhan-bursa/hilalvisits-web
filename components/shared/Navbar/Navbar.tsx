"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import cn from "classnames";

import "./styles.css";
import { PAGE_LINKS, PAGE_TITLES } from "@/constants/pages";
import { CollectionsBookmark, Home, Mail, NotListedLocation, PhotoCamera, PhotoLibrary, Menu, Close } from "@mui/icons-material";
import Link from "next/link";

const NAVBAR_MENU_ITEMS = [
  {
    title: PAGE_TITLES.about,
    href: PAGE_LINKS.about,
    icon: NotListedLocation
  },
  {
    title: PAGE_TITLES.blog,
    href: PAGE_LINKS.blog,
    icon: CollectionsBookmark
  },
  {
    title: PAGE_TITLES.home,
    href: PAGE_LINKS.home,
    icon: Home
  },
  {
    title: PAGE_TITLES.album,
    href: PAGE_LINKS.album,
    icon: PhotoLibrary
  },
  {
    title: PAGE_TITLES.photo,
    href: PAGE_LINKS.photo,
    icon: PhotoCamera
  },
]
export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const handleOpenMenu = () => setIsMobileMenuOpen(true)
  const handleCloseMenu = () => setIsMobileMenuOpen(false)
  return (
    <>
      {isMobileMenuOpen ?
        <div className='absolute top-0 z-[250] w-full h-full bg-gray-200 bg-opacity-90'>
          <div className="flex justify-end p-2 b-2" onClick={handleCloseMenu}><Close /></div>
          <nav className="h-[80vh] flex justify-center items-center bg-white bg-opacity-100">
            <ul>
              {NAVBAR_MENU_ITEMS.map((item, i) => {
                return <li
                  key={i + item.href}
                  className={cn(
                    "py-2 px-8 my-1",
                    "text-center text-xs hover:font-semibold border-t-2",
                    "hover:border-red-300 hover:text-red-400",
                    { active: item.href === pathname }
                  )}
                >
                  <Link href={item.href}>{item.title.toUpperCase()}</Link>
                </li>
              })}
            </ul>
          </nav>
        </div>
        : null}
      <nav className={cn(
        "h-full w-full sticky top-0 z-[150] mx-auto my-2 md:mb-4 px-4 bg-white",
      )}>
        <div>
          <div className="flex justify-end md:hidden text-gray-600 p-2 b-2" onClick={handleOpenMenu}><Menu color="inherit" /></div>
          <ul className={cn(
            "hidden md:flex  justify-center items-center",
          )}>
            {NAVBAR_MENU_ITEMS.map((item, i) => {
              return <li
                key={i + item.href}
                className={cn(
                  "py-2 px-8 my-1",
                  "text-center text-xs hover:font-semibold border-t-2",
                  "hover:border-red-300 hover:text-red-400",
                  { active: item.href === pathname }
                )}
              >
                <Link href={item.href}>{item.title.toUpperCase()}</Link>
              </li>
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}

