"use client";
import { useState } from "react";
import cn from "classnames";
import { MenuContext } from "./MenuContext";

import { MenuPageObject } from "@/types";
import { MobileMenu } from ".";
import Brand from "./Brand";
import MainMenu from "./MainMenu";

interface IProptypes {
    menus: {
        first?: MenuPageObject[]
        second?: MenuPageObject[]
        third?: MenuPageObject[]
    }
}

export default function NavbarMenu({ menus }: IProptypes) {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <MenuContext.Provider value={{
            menus,
            mobile: {
                isOpen: isMobileMenuOpen,
                setOpen: setMobileMenuOpen
            },
        }}>
            <nav className={cn(
                "h-full w-full mx-auto md:pb-6 pt-6 md:pt-10 max-w-[1200px] bg-white",
                "md:flex md:gap-8",
                "md:px-4 xl:px-0"
            )}>
                <Brand />
                <MainMenu />
                <MobileMenu />
            </nav>
        </MenuContext.Provider>
    )
}
