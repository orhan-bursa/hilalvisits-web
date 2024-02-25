import { MenuPageObject } from "@/types";
import { destructureMenuProps } from "@/utils";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Button } from "@mui/material";
import cn from "classnames";

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

    const { first, second, third } = menus!
    return (
        !!href ? <div>href</div> :
            !!menus ? <li
                className={cn(
                    "text-black font-semibold py-[6px]",
                )}
            >
                <Button
                    color="inherit"
                    sx={{ fontSize: 18, fontWeight: "inherit" }}
                    endIcon={<KeyboardArrowDown />}
                >
                    {"KEŞFET"}
                </Button>
                <div style={{ display: "none" }}>
                    <div className="flex">
                        {first?.map((menu, ind) => {
                            const { title } = destructureMenuProps(menu)
                            return (
                                <div>
                                    {title}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </li> : null
    )
}