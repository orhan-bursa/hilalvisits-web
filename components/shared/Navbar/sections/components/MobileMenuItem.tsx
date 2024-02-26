"use client"
import { MenuPageObject } from "@/types";
import { destructureMenuProps } from "@/utils";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Button } from "@mui/material";
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
        !!href ?
            <li>
                <Button
                    className="text-black text-lg font-semibold py-[6px] hover:text-amber-500"
                    LinkComponent={Link}
                    href={href}
                >
                    {title?.toLocaleUpperCase('tr-TR')}
                </Button>
            </li>
            : !!menus ?
                <li>
                    <Button
                        className="text-black text-lg font-semibold py-[6px]"
                        onClick={handleOpen}
                        endIcon={isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    >
                        {"KEŞFET"}
                    </Button>
                    {isOpen ?
                        <div className="flex flex-col text-start">
                            {menus?.first?.map((menu, ind) => {
                                const { title, path } = destructureMenuProps(menu)
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
                </li>
                : null
    )
}