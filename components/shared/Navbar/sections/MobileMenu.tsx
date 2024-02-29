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
import { MobileMenuItem } from "./components";

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
                            "py-4 mt-[15vh] bg-white bg-opacity-100",
                            "border-y-2 border-amber-400",
                            "bg-[#fffbf7]"
                        )}>
                        <div className="w-full">
                            <div className="w-full flex justify-end p-2 b-2 text-amber-400">
                                <IconButton onClick={handleCloseMenu} sx={{ color: "black" }}>
                                    <Close />
                                </IconButton>
                            </div>
                            <nav className="w-full">
                                <ul>
                                    <MobileMenuItem
                                        title={"KEŞFET"}
                                        menus={menus}
                                    />
                                    {NAVBAR_MENU_ITEMS.map((item, i) => {
                                        return <MobileMenuItem
                                            title={item.title}
                                            href={item.href}
                                        />
                                    })}
                                </ul>
                            </nav>
                        </div>
                        <div className="w-full flex justify-between items-center p-2 mt-12 text-black" onClick={handleCloseMenu}>
                            <IconButton size="small" href="mailto:hilalvisits@gmail.com" sx={{ color: "black" }}>
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