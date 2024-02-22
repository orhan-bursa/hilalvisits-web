"use client";
import { GetDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { useState } from "react";
import { usePathname } from "next/navigation";
import cn from "classnames";

import "./styles.css";
import Link from "next/link";
import { whisper } from "@/utils/fonts";
import { KeyboardArrowDown } from "@mui/icons-material";
import { MainMenuItem } from "./components";
import { DatabaseProperty, MenuItem, MenuPageObject } from "@/types";
import { destructureMenuProps } from "@/utils";

interface IProptypes {
    menus: {
        first?: MenuPageObject[]
        second?: MenuPageObject[]
        third?: MenuPageObject[]
    }
}

export default function DesktopMenu({ menus }: IProptypes) {
    const pathname = usePathname();
    const [hovering, setHovering] = useState<number | null>(null)
    const [closedByClick, setClosedByClick] = useState<number | null>(null)

    const { first, second, third } = menus

    const constantMenuItems: Array<MenuItem> = [
        {
            title: "Galeri",
            href: "/galeri",
        },
        {
            title: "Hilal Kimdir?",
            href: "/hakkımda",
        },
    ]

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
                "hidden md:flex justify-center items-end",
            )}>
                <div className={cn(
                    'flex gap-4 p-2 cursor-pointer'
                )}>
                    {first?.map((menu, ind) => {
                        const { title } = destructureMenuProps(menu)
                        return (
                            <MainMenuItem
                                key={ind + title}
                                item={menu}
                                menus={{ second, third }}
                            />
                        )
                    })}
                    {/* {constantMenuItems.map((item, ind) => {
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
                                    <KeyboardArrowDown />
                                    <div className={cn(
                                        hovering === ind && closedByClick !== ind ? "opacity-100"
                                            : "opacity-0 pointer-events-none",
                                        "absolute top-8 -right-2 bg-slate-600 text-white p-2",
                                        "duration-400",
                                    )}>
                                        hovering{item.title}
                                    </div>
                                </div>
                            </>
                        )
                    })} */}
                </div>
            </ul>
        </nav>
    )
}