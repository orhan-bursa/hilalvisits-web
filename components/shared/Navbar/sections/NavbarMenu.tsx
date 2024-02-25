"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import cn from "classnames";

import Link from "next/link";
import { whisper } from "@/utils/fonts";
import { MainMenuItem } from "./components";
import { MenuItem, MenuPageObject } from "@/types";
import { IconButton } from "@mui/material";
import { MailOutline } from "@mui/icons-material";
import { SOCIAL_MENU_ITEMS } from "@/constants";
import { MobileMenu } from ".";

interface IProptypes {
    menus: {
        first?: MenuPageObject[]
        second?: MenuPageObject[]
        third?: MenuPageObject[]
    }
}

export default function NavbarMenu({ menus }: IProptypes) {
    const pathname = usePathname();
    const [open, setOpen] = useState<string | null>(null)

    const { first, second, third } = menus

    const constantMenuItems: Array<MenuItem> = [
        {
            title: "Galeri",
            href: "/galeri",
        },
        {
            title: "Hakkımda?",
            href: "/hakkımda",
        },
    ]

    return (
        <nav className={cn(
            "h-full w-full mx-auto md:pb-6 pt-6 md:pt-10 max-w-[1200px] bg-white md:flex md:gap-8",
        )}>
            <div className={cn(
                "brand text-center text-[80px]",
                "text-amber-400 whitespace-nowrap"
            )}
            >
                <Link href={"/"}>
                    <h1
                        className={cn(whisper.className, " leading-[50px]")
                        }
                    >Hilal Visits</h1>
                </Link>
            </div>
            <div className={cn(
                "hidden md:flex justify-between items-end grow",
            )}>
                <div className="flex">
                    {first?.map((menu, ind) => {
                        return (
                            <MainMenuItem
                                key={ind}
                                open={open}
                                setOpen={setOpen}
                                item={menu}
                                menus={{ second, third }}
                            />
                        )
                    })}
                </div>
                <div className="flex gap-2">
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
                    <div className="w-min px-2 border-l-[1px] border-black">
                        <IconButton
                            href="mailto:hilalvisits@gmail.com"
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
                            <MailOutline />
                        </IconButton>
                    </div>
                </div>
            </div>
            <MobileMenu menus={menus} />
        </nav>
    )
}