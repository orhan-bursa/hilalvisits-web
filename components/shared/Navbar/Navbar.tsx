'use client'
import { MenuItemType } from '@/types/prismic-types'
import { useState } from 'react'
import { MenuContext } from './sections/MenuContext'
import Brand from './sections/Brand'
import MainMenu from './sections/MainMenu'
import cn from 'classnames'
import MobileMenu from './sections/MobileMenu'

export default function Navbar({ menuItems }: { menuItems: MenuItemType[] }) {
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

	return (
		<MenuContext.Provider
			value={{
				menuItems,
				mobile: {
					isOpen: isMobileMenuOpen,
					setOpen: setMobileMenuOpen
				}
			}}
		>
			<nav
				className={cn(
					'mx-auto h-full w-full max-w-[1200px] bg-white pt-6 md:pb-6 md:pt-10',
					'md:flex md:gap-8',
					'md:px-4 xl:px-0'
				)}
			>
				<Brand />
				<MainMenu />
				<MobileMenu />
			</nav>
		</MenuContext.Provider>
	)
}
