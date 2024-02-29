"use client"
import { MenuPageObject } from "@/types";
import { destructureMenuProps } from "@/utils";
import { ArrowForward, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import cn from "classnames";
import Link from "next/link";
import { useState } from "react";
import { MobileSecondaryMenuItem } from ".";

interface IPropTypes {
    title: string,
    menus?: {
        first?: MenuPageObject[]
        second?: MenuPageObject[]
        third?: MenuPageObject[]
    },
    href?: string
}
export default function MobileMenuItem({ title, menus, href }: IPropTypes) {
    const [isOpen, setOpen] = useState(false)
    const handleOpen = () => setOpen(pre => !pre)
    const [openMenu, setOpenMenu] = useState<string | null>(null)

    return (
        !!menus ?
            <>
                <li className="border-b-[1px] border-gray-400 flex">
                    <Button
                        className={cn(
                            "w-full text-lg font-semibold px-2 py-3 flex justify-start text-black",
                        )}
                        onClick={handleOpen}
                        endIcon={isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    >
                        {title?.toLocaleUpperCase('tr-TR')}
                    </Button>
                    <IconButton>
                        <ArrowForward />
                    </IconButton>
                </li>
                {isOpen ?
                    <div className="flex flex-col text-start ">
                        {menus?.first?.map((menu) => {
                            return (
                                <MobileSecondaryMenuItem
                                    key={menu.id}
                                    item={menu}
                                    menus={{
                                        second: menus?.second,
                                        third: menus?.third
                                    }}
                                    open={openMenu}
                                    setOpen={setOpenMenu}
                                />
                            )
                        })}
                    </div>
                    : null}
            </>
            : !!href ?
                <li className="border-b-[1px] border-gray-400">
                    <Button
                        className="w-full text-lg font-semibold px-2 py-3 flex justify-start text-black"
                        LinkComponent={Link}
                        href={href}
                    >
                        {title?.toLocaleUpperCase('tr-TR')}
                    </Button>
                </li>
                : null
    )
}