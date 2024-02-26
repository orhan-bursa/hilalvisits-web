"use client"
import { MenuPageObject } from "@/types"
import { destructureMenuProps } from "@/utils"
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { Button } from "@mui/material"
import { Dispatch, SetStateAction, useMemo, useState } from "react"

interface IPropTypes {
    item: MenuPageObject
    menus?: {
        second?: MenuPageObject[]
        third?: MenuPageObject[]
    },
    open: string | null,
    setOpen: Dispatch<SetStateAction<string | null>>
}

export default function MobileSecondaryMenuItem({ item, menus, open, setOpen }: IPropTypes) {
    const { title: itemTitle } = destructureMenuProps(item)
    const { second, third } = menus!

    const isOpen = useMemo(() => open === itemTitle, [open])

    return (
        <div className="pl-4">
            <Button
                className="text-black text-lg font-semibold py-[6px]"
                onClick={() => {
                    setOpen(!isOpen ? itemTitle : null)
                }}
                endIcon={isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            >
                {itemTitle?.toLocaleUpperCase("tr-TR")}
            </Button>
            {isOpen && !!second && second?.length ? second
                .filter(m => {
                    const { parent } = destructureMenuProps(m)
                    return parent?.[0]?.id === item.id
                })
                .map((menu, ind) => {
                    const { title } = destructureMenuProps(menu)
                    return (
                        <div>{title}</div>
                    )
                }) : null}
        </div>
    )
}
// <Button
//                                 className="text-black text-lg font-semibold py-[6px]"
//                                 LinkComponent={Link}
//                                 href={path}
//                             >
//                                 {title?.toLocaleUpperCase('tr-TR')}
//                             </Button>