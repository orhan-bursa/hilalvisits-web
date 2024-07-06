"use client"
import { Dispatch, SetStateAction, useMemo } from 'react';
import cn from 'classnames';
import { KeyboardArrowDown } from '@mui/icons-material';
import { MenuPageObject } from '@/types';
import { destructureMenuProps } from '@/utils';
import MainSecondaryMenuItem from './MainSecondaryMenuItem';
import { useMenus } from '../../MenuContext';
interface IProptypes {
    open: string | null,
    setOpen: Dispatch<SetStateAction<string | null>>
    item: MenuPageObject,
}
export default function MainMenuItem({ item, open, setOpen }: IProptypes) {

    const { second } = useMenus()
    const { title: itemTitle } = destructureMenuProps(item)
    const isOpen = useMemo(() => open === itemTitle, [open, itemTitle])

    return (
        <div
            className="relative flex font-semibold pb-1 px-2 cursor-pointer hover:text-amber-500 duration-300"
            onClick={() => {
                setOpen(!isOpen ? itemTitle : null)
            }}
        >
            <p className={isOpen ? "text-amber-500" : "text-inherit"}>
                {itemTitle?.toLocaleUpperCase("tr-TR")}
            </p>
            <KeyboardArrowDown className={isOpen ? "text-amber-400" : "text-inherit"} />
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
                        return (
                            <MainSecondaryMenuItem
                                key={ind + menu.id}
                                item={menu}
                            />
                        )
                    }) : null}

            </div>
        </div>
    );
}