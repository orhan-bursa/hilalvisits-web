import { Dispatch, SetStateAction, createContext, useContext } from 'react'
import { MenuItemType } from '@/types/prismic-types'

type MenuContextValue = {
	menuItems: MenuItemType[]
	mobile: {
		isOpen: boolean
		setOpen: Dispatch<SetStateAction<boolean>>
	}
}

export const MenuContext = createContext<MenuContextValue | undefined>(undefined)

export const useMenuItems = () => {
	const context = useContext(MenuContext)

	if (!context)
		throw new Error('useMenuItems hook must be used within <MenuContext.Provider> component')

	return context.menuItems
}

export const useMobileMenu = () => {
	const context = useContext(MenuContext)

	if (!context)
		throw new Error('useMobileMenu hook must be used within <MenuContext.Provider> component')

	return context.mobile
}
