'use client'
import { type MouseEvent } from 'react'
import cn from 'classnames'
import { Menu, Close } from '@mui/icons-material'
import Link from 'next/link'
import { Button, IconButton } from '@mui/material'
import { MobileMenuItem, MobileSocials } from './components/mobile'
import { useMobileMenu } from './MenuContext'
import { MenuItemType } from '@/types/prismic-types'

export default function MobileMenu() {
	const stopPropagation = (e: MouseEvent<HTMLElement>) => e.stopPropagation()

	const { isOpen, setOpen } = useMobileMenu()

	const handleOpenMenu = () => setOpen(true)
	const handleCloseMenu = () => setOpen(false)

	return (
		<>
			<div onClick={handleOpenMenu} className="flex justify-end px-3 pb-1 pt-4 md:hidden">
				<Menu />
			</div>
			{isOpen ? (
				<div
					className="absolute top-0 z-[250] h-full w-full bg-gray-200 bg-opacity-80"
					onClick={handleCloseMenu}
				>
					<div
						onClick={stopPropagation}
						className={cn(
							'sticky top-[15vh] flex flex-col items-center justify-between',
							'mt-[15vh] bg-white bg-opacity-100 py-4',
							'border-y-2 border-amber-400',
							'bg-[#fffbf7]'
						)}
					>
						<div className="w-full max-w-md">
							<div className="flex w-full justify-end pt-2 text-amber-400">
								<IconButton onClick={handleCloseMenu} sx={{ color: 'black', p: 0 }}>
									<Close />
								</IconButton>
							</div>
							<nav className="w-full">
								<ul>
									<MobileMenuItem title={'KEŞFET'} defaultOpen={true} />
									{[
										{
											title: 'Galeri',
											href: 'galeri'
										},
										{
											title: 'Kimim?',
											href: 'hakkımda'
										}
									].map(item => (
										<li
											className="border-b-[1px] border-gray-400"
											onClick={handleCloseMenu}
											key={'menu-' + item.title}
										>
											<Button
												key={item.title}
												className="flex w-full justify-start px-2 py-3 text-lg font-semibold text-black"
												LinkComponent={Link}
												href={item.href}
												onClick={handleCloseMenu}
											>
												{item.title?.toLocaleUpperCase('tr-TR')}
											</Button>
										</li>
									))}
								</ul>
							</nav>
							<MobileSocials />
						</div>
					</div>
				</div>
			) : null}
		</>
	)
}
