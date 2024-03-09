import { SOCIAL_MENU_ITEMS } from "@/constants"
import { MailOutline } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { MainMenuItem } from "./components/main"
import { useMenus } from "./MenuContext"
import { useState } from "react"
import Link from "next/link"

export default function MainMenu() {
    const [open, setOpen] = useState<string | null>(null)
    const { first } = useMenus()

    return (
        <div className="hidden md:flex justify-between items-end grow">
            <div className="flex">
                {first?.map((menu) => {
                    return (
                        <MainMenuItem
                            key={menu.id}
                            open={open}
                            setOpen={setOpen}
                            item={menu}
                        />
                    )
                })}
                <FixedMenuItem
                    key={"photo"}
                    title={"Galeri"}
                    href="/galeri"
                />
                <FixedMenuItem
                    key={"hakkimda"}
                    title={"Hakkımda"}
                    href="/hakkimda"
                />
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
    )
}

function FixedMenuItem({ title, href }: { title: string, href: string }) {
    return (
        <Link href={href}>
            <div
                className="relative flex font-semibold pb-1 px-2 cursor-pointer hover:text-amber-500 duration-300"
            >
                <p className={"text-inherit"}>
                    {title?.toLocaleUpperCase("tr-TR")}
                </p>
            </div>
        </Link>
    )
}