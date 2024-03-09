"use client";
import { useState, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import cn from "classnames";

import { PAGE_LINKS, PAGE_TITLES } from "@/constants/pages";
import { CollectionsBookmark, Home, MailOutline, NotListedLocation, PhotoCamera, PhotoLibrary, Menu, Close, KeyboardArrowDown } from "@mui/icons-material";
import Link from "next/link";
import { Button, IconButton } from "@mui/material";
import { SOCIAL_MENU_ITEMS } from "@/constants";
import { MobileMenuItem, MobileSocials } from "./components/mobile";
import { useMenus, useMobileMenu } from "./MenuContext";

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

export default function MobileMenu() {
    const stopPropagation = (e: MouseEvent<HTMLElement>) => e.stopPropagation();

    const { isOpen, setOpen } = useMobileMenu()

    const handleOpenMenu = () => setOpen(true)
    const handleCloseMenu = () => setOpen(false)

    return (
        <>
            <div onClick={handleOpenMenu} className="flex md:hidden justify-end px-3 pt-4 pb-1">
                <Menu />
            </div>
            {isOpen ?
                <div className='absolute top-0 z-[250] w-full h-full bg-gray-200 bg-opacity-80' onClick={handleCloseMenu}>
                    <div
                        onClick={stopPropagation}
                        className={cn(
                            "flex flex-col justify-between items-center sticky top-[15vh]",
                            "py-4 mt-[15vh] bg-white bg-opacity-100",
                            "border-y-2 border-amber-400",
                            "bg-[#fffbf7]"
                        )}>
                        <div className="w-full max-w-md">
                            <div className="w-full flex justify-end pt-2 text-amber-400">
                                <IconButton onClick={handleCloseMenu} sx={{ color: "black", p: 0 }}>
                                    <Close />
                                </IconButton>
                            </div>
                            <nav className="w-full">
                                <ul>
                                    <MobileMenuItem title={"KEŞFET"} defaultOpen={true} />
                                    {
                                        [
                                            {
                                                title: "Galeri",
                                                href: "galeri"
                                            },
                                            {
                                                title: "Kimim?",
                                                href: "hakkımda"
                                            }
                                        ].map(item => (
                                            <li className="border-b-[1px] border-gray-400" onClick={handleCloseMenu}>
                                                <Button
                                                    key={item.title}
                                                    className="w-full text-lg font-semibold px-2 py-3 flex justify-start text-black"
                                                    LinkComponent={Link}
                                                    href={item.href}
                                                    onClick={handleCloseMenu}
                                                >
                                                    {item.title?.toLocaleUpperCase('tr-TR')}
                                                </Button>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </nav>
                            <MobileSocials />
                        </div>
                    </div>
                </div>
                : null}
        </>

    )
}