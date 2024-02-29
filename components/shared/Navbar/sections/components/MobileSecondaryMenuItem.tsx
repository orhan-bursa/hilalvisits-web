"use client"
import { MenuPageObject } from "@/types"
import { destructureMenuProps } from "@/utils"
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { Button } from "@mui/material"
import Link from "next/link"
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
    const { second } = menus!

    const isOpen = useMemo(() => open === itemTitle, [open])

    return (
        <>
            <div className="pl-4 border-b-[1px] border-gray-400">
                <Button
                    className="w-full text-lg font-semibold px-2 py-3 flex justify-start text-black"
                    onClick={() => {
                        setOpen(!isOpen ? itemTitle : null)
                    }}
                    endIcon={isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                >
                    {itemTitle?.toLocaleUpperCase("tr-TR")}
                </Button>
            </div>
            {isOpen && !!second && second?.length ? second
                .filter(m => {
                    const { parent } = destructureMenuProps(m)
                    return parent?.[0]?.id === item.id
                })
                .map((m) => {
                    const { title, path } = destructureMenuProps(m)
                    return (
                        <Link href={path} key={m.id}>
                            <p
                                className="w-full text-lg font-semibold pl-8 pr-2 py-1 text-black"
                            >{title?.toLocaleUpperCase('tr-TR')}</p>
                        </Link>
                    )
                }) : null}
        </>
    )
}
