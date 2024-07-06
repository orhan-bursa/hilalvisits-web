"use client"
import { MenuPageObject } from "@/types"
import { destructureMenuProps } from "@/utils"
import { ArrowForward, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { Button } from "@mui/material"
import Link from "next/link"
import { Dispatch, SetStateAction, useMemo, useState } from "react"
import { useMenus, useMobileMenu } from "../../MenuContext"

interface IPropTypes {
    item: MenuPageObject
    open: string | null,
    setOpen: Dispatch<SetStateAction<string | null>>
}

export default function MobileSecondaryMenuItem({ item, open, setOpen }: IPropTypes) {
    const { title: itemTitle, path: itemPath } = destructureMenuProps(item)
    const { second } = useMenus()
    const { setOpen: setMobileMenuOpen } = useMobileMenu()
    const closeMobileMenu = () => setMobileMenuOpen(false)

    const isOpen = useMemo(() => open === itemTitle, [open, itemTitle])

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
                        <div className="pl-8 border-b-[1px] border-gray-400" key={m?.id}>
                            <Button
                                key={m.id}
                                LinkComponent={Link}
                                href={path}
                                onClick={closeMobileMenu}
                                className="w-full text-lg font-semibold py-3 flex justify-start text-black"
                            >
                                {title?.toLocaleUpperCase('tr-TR')}
                            </Button>
                        </div>
                    )
                }) : null}
            {isOpen ? (
                <div className="flex pl-8 border-b-[1px] border-gray-400">
                    <Button
                        LinkComponent={Link}
                        href={itemPath}
                        onClick={closeMobileMenu}
                        className="w-full text-lg font-semibold py-3 flex justify-start text-black"
                        startIcon={<ArrowForward />}
                    >
                        KATEGORİYE GİT
                    </Button>
                </div>
            ) : null}
        </>
    )
}