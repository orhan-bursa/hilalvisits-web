import { MenuPageObject } from "@/types"
import { destructureMenuProps } from "@/utils"
import cn from "classnames"
import Link from "next/link"

export default function SecondaryMenuItem({ item, menus }: { item: MenuPageObject, menus: { third?: MenuPageObject[] } }) {
    const { third } = menus
    const { title: secondaryTitle } = destructureMenuProps(item)

    return (
        <div className='group relative bg-amber-400 cursor-pointer group'>
            <p className={`
            border-l-4 group-hover:pl-4 border-transparent group-hover:border-amber-500 
            hover:border-amber-600 hover:bg-amber-500 
            p-3 transition-all
            `}>
                {secondaryTitle?.toLocaleUpperCase('tr-TR')}
            </p>
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
                                href={path}
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

/*
<div className={cn(
                "hidden opacity-0 pointer-events-none",
                "group-hover:block group-hover:opacity-100 group-hover:pointer-events-auto",
                "duration-500",
            )}>
                {third?.map(m => {
                    const { title: childTitle, parent } = destructureMenuProps(m)
                    return (
                        parent?.[0]?.id === item.id ?
                            <div className="bg-amber-400 hover:bg-amber-500 p-3 pl-5">
                                {childTitle}
                            </div>
                            : null
                    )
                })}
            </div>
*/