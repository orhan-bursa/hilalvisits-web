"use client"
import { useState } from 'react';
import cn from 'classnames';
import { GetDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { KeyboardArrowDown } from '@mui/icons-material';
import { DatabaseProperty, MenuItem, MenuPageObject } from '@/types';
import { destructureMenuProps } from '@/utils';
import SecondaryMenuItem from './SecondaryMenuItem';
interface IProptypes {
    item: MenuPageObject,
    menus: {
        second?: MenuPageObject[],
        third?: MenuPageObject[]
    }
}
export default function MainMenuItem({ item, menus }: IProptypes) {
    // const [hovering, setHovering] = useState<boolean>(false)
    // const [closedByClick, setClosedByClick] = useState<boolean>(false)
    const [isOpen, setOpen] = useState<boolean>(false)

    const { second, third } = menus
    const { title: mainTitle } = destructureMenuProps(item)
    return (
        <div
            className="relative flex font-semibold"
            onClick={() => {
                setOpen(pre => !pre)
            }}
        >
            <p className={isOpen ? "text-amber-500" : "text-black"}>
                {mainTitle?.toLocaleUpperCase("tr-TR")}
            </p>
            <KeyboardArrowDown className={isOpen ? "text-amber-400" : "text-black"} />
            <div className={cn(
                "absolute top-10 -right-2 bg-amber-400 text-white z-50 min-w-[210px]",
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none duration-500",
            )}>
                {second?.map((menu, ind) => {
                    const { title, parent } = destructureMenuProps(menu)
                    return (
                        parent?.[0]?.id === item.id ?
                            <SecondaryMenuItem
                                key={ind + title}
                                item={menu}
                                menus={{ third }}
                            />
                            : null
                    )
                })}
            </div>
        </div>
    );
}