"use client";
import { useState, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import cn from "classnames";

import "./styles.css";
import { PAGE_LINKS, PAGE_TITLES } from "@/constants/pages";
import { CollectionsBookmark, Home, MailOutline, NotListedLocation, PhotoCamera, PhotoLibrary, Menu, Close } from "@mui/icons-material";
import Link from "next/link";
import { Button, IconButton } from "@mui/material";
import { SOCIAL_MENU_ITEMS } from "@/constants";
import { babylonica } from "@/utils/fonts";

const NAVBAR_MENU_ITEMS = [
  {
    title: PAGE_TITLES.home,
    href: PAGE_LINKS.home,
    icon: Home
  },
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
  const stopPropagation = (e: MouseEvent<HTMLElement>) => e.stopPropagation();
  return (
    <>
      {isMobileMenuOpen ?
        <div className='absolute top-0 z-[250] w-full h-full bg-gray-200 bg-opacity-80' onClick={handleCloseMenu}>
          <div
            onClick={stopPropagation}
            className={cn(
              "flex flex-col justify-between items-center sticky top-[15vh]",
              "h-[80vh] py-4 mt-[15vh] bg-white bg-opacity-100",
              "border-y-2 border-amber-400"
            )}>
            <div className="w-full">
              <div className="w-full flex justify-end p-2 b-2 text-amber-400">
                <IconButton onClick={handleCloseMenu}>
                  <Close />
                </IconButton>
              </div>
              <nav className="w-full pl-8">
                <ul>
                  {NAVBAR_MENU_ITEMS.map((item, i) => {
                    return <li
                      key={i + item.href}
                      className={cn(
                        "flex items-center text-gray-500 font-light",
                        "py-[6px] pl-4 my-1",
                        "border-l-[3px] border-gray-200",
                        { "mobile-active": item.href === pathname }
                      )}
                    >
                      <Button
                        LinkComponent={Link}
                        href={item.href}
                        color="inherit"
                        sx={{ fontSize: 20, fontWeight: "inherit" }}
                      >
                        {item.title}
                      </Button>
                    </li>
                  })}
                </ul>
              </nav>
            </div>
            <div className="w-full flex justify-between p-2 b-2 text-gray-500" onClick={handleCloseMenu}>
              <IconButton size="small" href="mailto:hilalvisits@gmail.com">
                <MailOutline />
              </IconButton>
              <div className="flex">
                {SOCIAL_MENU_ITEMS.map((item, i) => {
                  const Icon = item.icon
                  return <IconButton
                    key={i + item.title}
                    LinkComponent={Link}
                    href={item.href ?? "/"}
                    color="inherit"
                    size="small"
                    sx={{
                      height: "100%",
                      aspectRatio: 1,
                    }}
                  >
                    <Icon />
                  </IconButton>
                })}
              </div>
            </div>
          </div>
        </div>
        : null}

      <nav className={cn(
        "h-full w-full max-w-[1200px] mx-auto px-4 py-2 bg-white flex justify-between",
      )}>
        <div
          key={"/"}
          className={cn(
            "brand text-center text-5xl sm:text-3xl whitespace-nowrap text-amber-400 py-2",
          )}
        >
          <Link href={"/"}>
            <h1>Hilal Visits</h1>
          </Link>
        </div>
        <div>
          <div className="flex justify-end md:hidden text-gray-600 p-2 b-2" onClick={handleOpenMenu}><Menu color="inherit" /></div>
          <ul className={cn(
            "hidden md:flex  justify-center items-center",
          )}>
            {NAVBAR_MENU_ITEMS.map((item, i) => {
              return <li
                key={i + item.href}
                className={cn(
                  "py-2 px-4 my-1",
                  "text-center text-md hover:font-semibold border-b-2",
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

