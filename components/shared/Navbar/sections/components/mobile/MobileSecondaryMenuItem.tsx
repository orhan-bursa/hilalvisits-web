'use client'
import { MenuPageObject } from '@/types'
import { destructureMenuProps } from '@/utils'
import { ArrowForward, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { Button } from '@mui/material'
import Link from 'next/link'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { useMobileMenu } from '../../MenuContext'
import { MenuItemType } from '@/types/prismic-types'

interface IPropTypes {
	item: MenuItemType
	open: string | null
	setOpen: Dispatch<SetStateAction<string | null>>
}

export default function MobileSecondaryMenuItem({ item, open, setOpen }: IPropTypes) {
	const { setOpen: setMobileMenuOpen } = useMobileMenu()
	const closeMobileMenu = () => setMobileMenuOpen(false)

	const isOpen = useMemo(() => open === item.title, [open, item])

	return (
		<>
			<div className="border-b-[1px] border-gray-400 pl-4">
				<Button
					className="flex w-full justify-start px-2 py-3 text-lg font-semibold text-black"
					onClick={() => {
						setOpen(!isOpen ? item.title : null)
					}}
					endIcon={isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
				>
					{item.title?.toLocaleUpperCase('tr-TR')}
				</Button>
			</div>
			{isOpen && !!item.items && item.items?.length
				? item.items.map((i, key) => {
						return (
							<div className="border-b-[1px] border-gray-400 pl-8" key={key}>
								<Button
									LinkComponent={Link}
									href={i.path}
									onClick={closeMobileMenu}
									className="flex w-full justify-start py-3 text-lg font-semibold text-black"
								>
									{i.title?.toLocaleUpperCase('tr-TR')}
								</Button>
							</div>
						)
					})
				: null}
			{isOpen ? (
				<div className="flex border-b-[1px] border-gray-400 pl-8">
					<Button
						LinkComponent={Link}
						href={item.path}
						onClick={closeMobileMenu}
						className="flex w-full justify-start py-3 text-lg font-semibold text-black"
						startIcon={<ArrowForward />}
					>
						KATEGORİYE GİT
					</Button>
				</div>
			) : null}
		</>
	)
}
