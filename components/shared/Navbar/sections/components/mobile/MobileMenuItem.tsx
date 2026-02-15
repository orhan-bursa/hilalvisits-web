'use client'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { Button } from '@mui/material'
import cn from 'classnames'
import { Dispatch, SetStateAction, useState } from 'react'
import { MobileSecondaryMenuItem } from '../mobile'
import { MenuItemType } from '@/types/prismic-types'

export default function MobileMenuItem({
	title,
	menuItems,
	setMobileMenuOpen,
	defaultOpen = false
}: {
	title: string
	menuItems: MenuItemType[]
	setMobileMenuOpen: Dispatch<SetStateAction<boolean>>
	defaultOpen?: boolean
}) {
	const [isOpen, setOpen] = useState(defaultOpen)
	const handleOpen = () => setOpen(pre => !pre)
	const [openMenu, setOpenMenu] = useState<string | null>(null)

	return !!menuItems && menuItems.length > 0 ? (
		<>
			<li className="flex border-b-[1px] border-gray-400">
				<Button
					className={cn('flex w-full justify-start py-3 text-lg font-semibold text-black')}
					onClick={handleOpen}
					endIcon={isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
				>
					{title?.toLocaleUpperCase('tr-TR')}
				</Button>
			</li>
			{isOpen ? (
				<div className="flex flex-col text-start">
					{menuItems?.map((item, key) => {
						return (
							<MobileSecondaryMenuItem
								key={key}
								item={item}
								open={openMenu}
								setOpen={setOpenMenu}
								setMobileMenuOpen={setMobileMenuOpen}
							/>
						)
					})}
				</div>
			) : null}
		</>
	) : null
}
