"use client";
import { useState, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import cn from "classnames";

import { PAGE_LINKS, PAGE_TITLES } from "@/constants/pages";
import { CollectionsBookmark, Home, MailOutline, NotListedLocation, PhotoCamera, PhotoLibrary, Menu, Close, KeyboardArrowDown } from "@mui/icons-material";
import Link from "next/link";
import { Button, IconButton } from "@mui/material";
import { SOCIAL_MENU_ITEMS } from "@/constants";
import { MenuPageObject } from "@/types";

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

interface IProptypes {
    menus: {
        first?: MenuPageObject[]
        second?: MenuPageObject[]
        third?: MenuPageObject[]
    }
}
export default function MobileMenu({ menus }: IProptypes) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsOpen] = useState(false)
    const handleOpenMenu = () => setIsOpen(true)
    const handleCloseMenu = () => setIsOpen(false)
    const stopPropagation = (e: MouseEvent<HTMLElement>) => e.stopPropagation();

    return (
        <>
            <div onClick={handleOpenMenu} className="flex md:hidden justify-end px-3 pt-4 pb-1">
                <Menu />
            </div>
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
                                    <li
                                        className={cn(
                                            "flex items-center  text-black   font-semibold",
                                            "py-[6px] pl-4 ",
                                            "border-l-[3px] border-gray-400",
                                        )}
                                    >
                                        <Button
                                            LinkComponent={Link}
                                            href={"item.href"}
                                            color="inherit"
                                            sx={{ fontSize: 18, fontWeight: "inherit" }}
                                            endIcon={<KeyboardArrowDown />}
                                        >
                                            {"KEŞFET"}
                                        </Button>
                                    </li>
                                    {NAVBAR_MENU_ITEMS.map((item, i) => {
                                        return <li
                                            key={i + item.href}
                                            className={cn(
                                                "flex items-center  text-black   font-semibold",
                                                "py-[6px] pl-4 ",
                                                "border-l-[3px] border-gray-400",
                                                { "mobile-active": item.href === pathname }
                                            )}
                                        >
                                            <Button
                                                LinkComponent={Link}
                                                href={item.href}
                                                color="inherit"
                                                sx={{ fontSize: 18, fontWeight: "inherit" }}
                                            >
                                                {item.title}
                                            </Button>
                                        </li>
                                    })}

                                </ul>
                            </nav>
                        </div>
                        <div className="w-full flex justify-between p-2 b-2 text-black" onClick={handleCloseMenu}>
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
                                        sx={{
                                            height: 28,
                                            width: 28,
                                            color: "black",
                                            transition: "all 400ms ease",
                                            "&:hover": {
                                                color: "#FBBF24",
                                                backgroundColor: 'transparent',
                                            }
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
        </>

    )
}