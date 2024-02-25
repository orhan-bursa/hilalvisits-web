"use client"
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import cn from 'classnames';
import { GetDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { KeyboardArrowDown } from '@mui/icons-material';
import { DatabaseProperty, MenuItem, MenuPageObject } from '@/types';
import { destructureMenuProps } from '@/utils';
import SecondaryMenuItem from './SecondaryMenuItem';
interface IProptypes {
    open: string | null,
    setOpen: Dispatch<SetStateAction<string | null>>
    item: MenuPageObject,
    menus: {
        second?: MenuPageObject[],
        third?: MenuPageObject[]
    }
}
export default function MainMenuItem({ item, menus, open, setOpen }: IProptypes) {

    const { second, third } = menus
    const { title: mainTitle } = destructureMenuProps(item)
    const isOpen = useMemo(() => open === mainTitle, [open])

    return (
        <div
            className="relative flex font-semibold pb-1 px-2 cursor-pointer"
            onClick={() => {
                setOpen(!isOpen ? mainTitle : null)
            }}
        >
            <p className={isOpen ? "text-amber-500" : "text-black"}>
                {mainTitle?.toLocaleUpperCase("tr-TR")}
            </p>
            <KeyboardArrowDown className={isOpen ? "text-amber-400" : "text-black"} />
            <div className={cn(
                "absolute top-10 -left-2 bg-amber-400 text-white z-50 min-w-[210px] -translate-y-2 duration-300",
                {
                    "opacity-100 transform-none": isOpen,
                    "opacity-0 pointer-events-none": !isOpen
                },
            )}>
                {!!second && second?.length ? second
                    .filter(m => {
                        const { parent } = destructureMenuProps(m)
                        return parent?.[0]?.id === item.id
                    })
                    .map((menu, ind) => {
                        const { title } = destructureMenuProps(menu)
                        return (
                            <SecondaryMenuItem
                                key={ind + title}
                                item={menu}
                                menus={{ third }}
                            />
                        )
                    }) : null}

            </div>
        </div>
    );
}