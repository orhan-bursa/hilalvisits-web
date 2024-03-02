"use client"
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Button } from "@mui/material";
import cn from "classnames";
import { useState } from "react";
import { MobileSecondaryMenuItem } from "../mobile";
import { useMenus } from "../../MenuContext";

export default function MobileMenuItem({ title }: { title: string }) {
    const [isOpen, setOpen] = useState(false)
    const handleOpen = () => setOpen(pre => !pre)
    const [openMenu, setOpenMenu] = useState<string | null>(null)

    const menus = useMenus()
    return (
        !!menus ?
            <>
                <li className="border-b-[1px] border-gray-400 flex">
                    <Button
                        className={cn(
                            "w-full text-lg font-semibold py-3 flex justify-start text-black",
                        )}
                        onClick={handleOpen}
                        endIcon={isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    >
                        {title?.toLocaleUpperCase('tr-TR')}
                    </Button>

                </li>
                {isOpen ?
                    <div className="flex flex-col text-start">
                        {menus?.first?.map((menu) => {
                            return (
                                <MobileSecondaryMenuItem
                                    key={menu.id}
                                    item={menu}
                                    open={openMenu}
                                    setOpen={setOpenMenu}
                                />
                            )
                        })}
                    </div>
                    : null}
            </>
            : null
    )
}