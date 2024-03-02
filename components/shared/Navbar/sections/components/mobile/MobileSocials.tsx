import { SOCIAL_MENU_ITEMS } from "@/constants"
import { MailOutline } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import Link from "next/link"
import { useMobileMenu } from "../../MenuContext"

export default function MobileSocials() {
    const { setOpen } = useMobileMenu()
    return (
        <div className="w-full flex justify-between items-center p-2 mt-12 text-black" onClick={() => setOpen(false)}>
            <div className="flex">
                {SOCIAL_MENU_ITEMS.map((item, i) => {
                    const Icon = item.icon
                    return <IconButton
                        key={i + item.title}
                        LinkComponent={Link}
                        href={item.href ?? "/"}
                        sx={{
                            height: 28,
                            width: 28,
                            color: "black"
                        }}
                    >
                        <Icon />
                    </IconButton>
                })}
            </div>
            <IconButton size="small" href="mailto:hilalvisits@gmail.com" sx={{ color: "black" }}>
                <MailOutline />
            </IconButton>
        </div>

    )
}