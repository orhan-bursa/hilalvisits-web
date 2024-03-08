import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import { MenuPageObject } from '@/types';

type MenuContextValue = {
    menus: {
        first?: MenuPageObject[]
        second?: MenuPageObject[]
        third?: MenuPageObject[]
    }
    mobile: {
        isOpen: boolean,
        setOpen: Dispatch<SetStateAction<boolean>>
    }
}

export const MenuContext = createContext<MenuContextValue | undefined>(undefined)

export const useMenus = () => {
    const context = useContext(MenuContext);

    if (!context)
        throw new Error('useMenus hook must be used within <MenuContext.Provider> component');

    return context.menus;
};

export const useMobileMenu = () => {
    const context = useContext(MenuContext);

    if (!context)
        throw new Error('useMobileMenu hook must be used within <MenuContext.Provider> component');

    return context.mobile;
}
