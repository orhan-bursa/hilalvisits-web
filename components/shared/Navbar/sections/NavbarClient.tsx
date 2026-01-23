'use client'
import { useState } from 'react'
import cn from 'classnames'
import { MenuContext } from './MenuContext'

import { MenuPageObject } from '@/types'
import { MobileMenu } from '.'
import Brand from './Brand'
import MainMenu from './MainMenu'
import useCategories from '@/hooks/useCategories'
import useBlogs from '@/hooks/useBlogs'

interface IProptypes {
	menus: {
		first?: MenuPageObject[]
		second?: MenuPageObject[]
		third?: MenuPageObject[]
	}
}

export default function NavbarMenu({ menus }: IProptypes) {
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

	const { categories } = useCategories()
	// console.log({ categories })
	const { blogs } = useBlogs()
	console.log({ blogs })

	return (
		<MenuContext.Provider
			value={{
				menus,
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
