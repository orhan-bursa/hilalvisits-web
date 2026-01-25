'use client'
import { useState } from 'react'
import cn from 'classnames'
import { MenuContext } from './MenuContext'
import { MobileMenu } from '.'
import Brand from './Brand'
import MainMenu from './MainMenu'
import { MenuItemType } from '@/types/prismic-types'

type Props = {
	menuItems: MenuItemType[]
}

export default function NavbarMenu({ menuItems }: Props) {
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
