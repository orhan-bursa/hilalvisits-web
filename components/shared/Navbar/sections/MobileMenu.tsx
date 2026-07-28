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
import { SOCIAL_MENU_ITEMS } from '@/constants'
import YouTube from '@mui/icons-material/YouTube'
import Instagram from '@mui/icons-material/Instagram'
import X from '@mui/icons-material/X'

type Props = {
	menuItems: MenuItemType[]
}

const ICON_MAP = {
	instagram: <Instagram />,
	twitter: <X />,
	youtube: <YouTube />
}
export default function MobileMenu({ menuItems }: Props) {
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

	const handleOpenMenu = () => setMobileMenuOpen(true)
	const handleCloseMenu = () => setMobileMenuOpen(false)

	return (
		<>
			<div onClick={handleOpenMenu} className="flex justify-between px-3 pb-1 pt-6 md:hidden">
				<div className="flex items-center gap-2">
					{SOCIAL_MENU_ITEMS.map((item, i) => {
						return (
							<IconButton
								key={i + item.title}
								LinkComponent={Link}
								href={item.href ?? '/'}
								target="_blank"
								sx={{
									height: 28,
									width: 28,
									color: 'black'
								}}
							>
								{ICON_MAP[item.icon as keyof typeof ICON_MAP]}
							</IconButton>
						)
					})}
				</div>
				<MenuIcon />
			</div>
			<Dialog onClose={handleCloseMenu} open={isMobileMenuOpen} fullScreen>
				<div className="flex w-full max-w-md grow flex-col overflow-hidden border-y-[3px] border-amber-400">
					<div className="flex w-full justify-end px-4 pt-4 text-amber-400">
						<IconButton onClick={handleCloseMenu} sx={{ color: 'black', p: 0 }}>
							<CloseIcon />
						</IconButton>
					</div>
					<nav className="h-[calc(100%-96px)] w-full grow overflow-y-auto">
						<ul>
							<MobileMenuItem
								setMobileMenuOpen={setMobileMenuOpen}
								menuItems={menuItems}
								title={'KEŞFET'}
								defaultOpen
							/>
							{[
								{
									title: 'Ben Kimim?',
									href: '/about'
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
		</>
	)
}
