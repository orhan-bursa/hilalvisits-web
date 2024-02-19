"use client";
import { GetDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { useState, type MouseEvent, useMemo } from "react";
import { usePathname } from "next/navigation";
import cn from "classnames";

import "./styles.css";
import { PAGE_LINKS, PAGE_TITLES } from "@/constants/pages";
import Link from "next/link";
import { SvgIconTypeMap } from "@mui/material";
import { SOCIAL_MENU_ITEMS } from "@/constants";
import { whisper } from "@/utils/fonts";
import DesktopMenuItem from "./DesktopMenuItem";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { KeyboardArrowDown } from "@mui/icons-material";


type DatabaseProperty = {
    id: string;
    name: string;
    color: string;
    description?: string
}
type MenuItem = {
    title: string
    href?: string
    type: "menu" | "item"
}
export default function DesktopMenu({ database }: { database: GetDatabaseResponse }) {
    const pathname = usePathname();
    const [hovering, setHovering] = useState<number | null>(null)
    const [closedByClick, setClosedByClick] = useState<number | null>(null)
    const menuProps = database?.properties?.menu?.type === "select" ?
        database?.properties?.menu?.select?.options : []

    const dynamicMenuItems: Array<MenuItem> = menuProps.map((prop: DatabaseProperty) => ({
        title: prop?.name,
        href: "/blog/" + prop?.description ?? prop?.name?.toLocaleLowerCase("en-US"),
        type: "menu"
    }))

    const constantMenuItems: Array<MenuItem> = [
        {
            title: "Galeri",
            href: "/galeri",
            type: "item"
        },
        {
            title: "Hilal Kimdir?",
            href: "/hakkımda",
            type: "item"

        },
    ]

    const menuItems: Array<MenuItem> = useMemo(() => [...dynamicMenuItems, ...constantMenuItems], [dynamicMenuItems])

    return (
        <nav className={cn(
            "h-full w-full max-w-[1200px] mx-auto px-4 bg-white flex justify-between",
        )}>
            <div
                key={"/"}
                className={cn(
                    "brand text-center text-6xl sm:text-7xl md:text-[84px] whitespace-nowrap text-amber-400",
                )}
            >
                <Link href={"/"}>
                    <h1
                        className={cn(
                            whisper.className,
                        )
                        }
                    >Hilal Visits</h1>
                </Link>
            </div>
            <ul className={cn(
                "hidden md:flex justify-center items-center",
            )}>
                <div className={cn(
                    'bg-slate-200 flex gap-4 p-2 cursor-pointer'
                )}>
                    {menuItems.map((item, ind) => {
                        return (
                            <>
                                <div
                                    key={ind + item.title}
                                    className="relative flex"
                                    onMouseEnter={() => {
                                        setHovering(ind)
                                    }}
                                    onClick={() => {
                                        setClosedByClick(ind)
                                    }}
                                    onMouseLeave={() => {
                                        setHovering(null)
                                        setClosedByClick(null)
                                    }}
                                >
                                    <p>{item.title}</p>
                                    {item.type === "menu" ? <KeyboardArrowDown /> : null}
                                    {item.type === "menu" ?
                                        <div className={cn(

                                            hovering === ind && closedByClick !== ind ? "opacity-100"
                                                : "opacity-0 pointer-events-none",
                                            "absolute top-8 -right-2 bg-slate-600 text-white p-2",
                                            "duration-400",
                                        )}>
                                            hovering{item.title}
                                        </div>
                                        : null}
                                </div>
                            </>
                        )
                    })}
                </div>
            </ul>
        </nav>
    )
}