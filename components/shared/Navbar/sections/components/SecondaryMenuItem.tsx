import { MenuPageObject } from "@/types"
import { destructureMenuProps } from "@/utils"
import cn from "classnames"

export default function SecondaryMenuItem({ item, menus }: { item: MenuPageObject, menus: { third?: MenuPageObject[] } }) {
    const { third } = menus
    const { title: secondaryTitle } = destructureMenuProps(item)
    return (
        <div
            className='group relative bg-amber-400'
        >
            <p className='group-hover:bg-amber-500 border-white group-hover:border-b-[1px] p-3 '>
                {secondaryTitle?.toLocaleUpperCase('tr-TR')}
            </p>
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
        </div>
    )
}