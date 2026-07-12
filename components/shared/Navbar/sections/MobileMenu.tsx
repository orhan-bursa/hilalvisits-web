'use client'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import Link from 'next/link'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { MobileMenuItem, MobileSocials } from './components/mobile'
import { MenuItemType } from '@/types/prismic-types'
import Dialog from '@mui/material/Dialog'

type Props = {
	menuItems: MenuItemType[]
}
export default function MobileMenu({ menuItems }: Props) {
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

	const handleOpenMenu = () => setMobileMenuOpen(true)
	const handleCloseMenu = () => setMobileMenuOpen(false)

	return (
		<>
			<div onClick={handleOpenMenu} className="flex justify-end px-3 pb-1 pt-4 md:hidden">
				<MenuIcon />
			</div>
			<Dialog onClose={handleCloseMenu} open={isMobileMenuOpen} fullScreen>
				<div className="relative flex w-full max-w-md grow flex-col border-y-[3px] border-amber-400">
					<div className="flex w-full justify-end px-4 pt-4 text-amber-400">
						<IconButton onClick={handleCloseMenu} sx={{ color: 'black', p: 0 }}>
							<CloseIcon />
						</IconButton>
					</div>
					<nav className="w-full grow">
						<ul>
							<MobileMenuItem
								setMobileMenuOpen={setMobileMenuOpen}
								menuItems={menuItems}
								title={'KEŞFET'}
								defaultOpen
							/>
							{[
								// {
								// 	title: 'Galeri',
								// 	href: 'galeri'
								// },
								{
									title: 'Ben Kimim?',
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
										className="flex w-full justify-start px-4 py-3 text-lg font-semibold text-black"
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
			</Dialog>

			{/*{isMobileMenuOpen ? (
				<div className="absolute top-0 z-[250] h-full w-full" onClick={handleCloseMenu}>
					<div
						onClick={stopPropagation}
						className={cn(
							'sticky top-0 flex h-screen flex-col items-center justify-between',
							'bg-white py-4',
							'border-y-[3px] border-amber-400',
							'bg-[#fffbf7]'
						)}
					>
						<div className="flex w-full max-w-md grow flex-col overflow-y-auto">
							<div className="flex w-full justify-end pt-2 text-amber-400">
								<IconButton onClick={handleCloseMenu} sx={{ color: 'black', p: 0 }}>
									<CloseIcon />
								</IconButton>
							</div>
							<nav className="w-full grow">
								<ul>
									<MobileMenuItem
										setMobileMenuOpen={setMobileMenuOpen}
										menuItems={menuItems}
										title={'KEŞFET'}
										defaultOpen
									/>
									{[
										// {
										// 	title: 'Galeri',
										// 	href: 'galeri'
										// },
										{
											title: 'Ben Kimim?',
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
							<MobileSocials setMobileMenuOpen={setMobileMenuOpen} />
						</div>
					</div>
				</div>
			) : null}*/}
		</>
	)
}
