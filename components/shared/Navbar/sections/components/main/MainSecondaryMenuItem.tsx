import { MenuPageObject } from "@/types"
import { destructureMenuProps } from "@/utils"
import cn from "classnames"
import Link from "next/link"
import { useMenus } from "../../MenuContext"
import { KeyboardArrowRight } from "@mui/icons-material"

export default function MainSecondaryMenuItem({ item }: { item: MenuPageObject }) {
    const { third } = useMenus()
    const { title: secondaryTitle, path } = destructureMenuProps(item)

    return (
        <div
            className='group relative bg-amber-400 cursor-pointer group'
        >
            <Link href={`/${path}`}>
                <p className={`
            border-l-4 group-hover:pl-4 border-transparent group-hover:border-amber-500 
            hover:border-amber-600 hover:bg-amber-500 
            p-3 transition-all
            `}
                >
                    {secondaryTitle?.toLocaleUpperCase('tr-TR')}
                </p>
            </Link>
            <KeyboardArrowRight className="absolute right-3 top-3 group-hover:right-2 transition-all" />
            <div className={cn(
                "absolute left-[100%] top-0 w-full bg-amber-400",
                "opacity-0 pointer-events-none group-hover:opacity-100 duration-300 group-hover:pointer-events-auto",
                "-translate-x-3 group-hover:-translate-x-0"
            )}>
                {!!third && third.length ? third
                    .filter(m => {
                        const { parent } = destructureMenuProps(m)
                        return parent?.[0]?.id === item.id
                    })
                    .map(m => {
                        const { title: childTitle, path } = destructureMenuProps(m)
                        return (
                            <Link
                                key={m.id}
                                href={`/${path}`}
                            >
                                <div className="bg-amber-400 hover:bg-amber-500 p-3 pl-5">
                                    {childTitle}
                                </div>
                            </Link>
                        )
                    }) : null}
            </div>
        </div>
    )
}