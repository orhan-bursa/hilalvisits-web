"use client";
import { usePathname } from "next/navigation";
import cn from "classnames";
import { babylonica } from "@/utils/fonts";

import "./styles.css";
import { PAGE_LINKS, PAGE_TITLES } from "@/constants/pages";
import { Button, IconButton } from "@mui/material";
import { CollectionsBookmark, Home, Mail, NotListedLocation, PhotoCamera, PhotoLibrary } from "@mui/icons-material";
import { SOCIAL_MENU_ITEMS } from "@/constants";
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

  return (
    <nav className={cn(
      "h-full w-full sticky top-0 z-[150] mx-auto",
    )}>
      <div className="bg-white">
        <ul className={cn(
          "flex justify-center items-center",
        )}>
          {NAVBAR_MENU_ITEMS.map(item => {
            return <li
              key={item.href}
              className={cn(
                "py-2 px-5 my-1",
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
      {/* <div className="flex justify-between items-center bg-amber-400 text-white">
        <div>
          <IconButton
            color="inherit"
            href="mailto:hilalvisits@gmail.com"
            target="blank"
            sx={{ p: 0 }}
          >
            <Mail />
          </IconButton>
        </div>
        <div className="flex justify-center">
          {SOCIAL_MENU_ITEMS.map(item => {
            const Icon = item.icon
            return <IconButton
              LinkComponent={Link}
              href={item.href ?? "/"}
              color="inherit"
              size="small"
              sx={{ padding: 0 }}
            >
              <Icon />
            </IconButton>
          })}
        </div>
      </div> */}

    </nav>
  );
}

