'use client'
import { SOCIAL_MENU_ITEMS } from '@/constants'
import { MenuPageObject } from '@/types'
import { destructureMenuProps } from '@/utils'
import { jost, whisper } from '@/utils/fonts'
import { KeyboardArrowUp, MailOutline } from '@mui/icons-material'
import { Button, IconButton, Tooltip } from '@mui/material'
import cn from 'classnames'
import Link from 'next/link'

export default function FooterClient({ first }: { first?: MenuPageObject[] }) {
	return (
		<div className="max-w[900px] space-y-4 md:mx-8 md:flex md:justify-center md:gap-12 md:space-y-0">
			<BrandWithSocials />
			<div
				className={cn(
					'flex max-w-[400px] justify-center gap-4 md:gap-12',
					'md:border-l-2 md:border-white md:border-opacity-70 md:pl-12'
				)}
			>
				<div className="text-end md:grow md:text-start">
					<h4
						className={cn(
							'w-full font-extralight md:space-y-1',
							'border-b-[1px] border-white border-opacity-70'
						)}
					>
						Keşfet
					</h4>
					<div className="mx-auto my-2 max-w-[200px] md:mx-0 md:max-w-none md:space-y-1">
						{first?.map(menu => {
							const { title, path } = destructureMenuProps(menu)
							return (
								<Button
									key={title}
									LinkComponent={Link}
									href={`/${path}`}
									color="inherit"
									sx={{
										color: '#fff',
										padding: 0
									}}
									className={cn(
										jost.className,
										'flex justify-end pr-[2px] md:justify-start md:pl-[2px]',
										'hover:bg-transparent hover:underline'
									)}
								>
									{title}
								</Button>
							)
						})}
						{[
							{
								title: 'Galeri',
								href: '/galeri'
							},
							{
								title: 'Kimim?',
								href: '/hakkimda'
							}
						].map(item => (
							<Button
								key={item.title}
								LinkComponent={Link}
								href={item.href}
								color="inherit"
								sx={{
									color: '#fff',
									padding: 0
								}}
								className={
									jost.className +
									' ' +
									'flex justify-end pr-[2px] hover:bg-transparent hover:underline md:justify-start md:pl-[2px]'
								}
							>
								{item.title?.toLocaleUpperCase('tr-TR')}
							</Button>
						))}
					</div>
				</div>
				<div
					className={cn(
						'border-l-2 border-white border-opacity-70 pl-4 text-start md:grow-[3]',
						'md:border-none md:border-opacity-100 md:pl-0'
					)}
				>
					<h4
						className={cn(
							'w-full font-extralight md:space-y-1',
							'border-b-[1px] border-white border-opacity-70'
						)}
					>
						İletişim
					</h4>
					<div className="my-2 max-w-[300px] space-y-3 md:max-w-none">
						<p className="text-start">
							Sorular veya iş teklifleri için iletişime geçmekten çekinmeyin!
						</p>
						<Button
							variant="outlined"
							color="inherit"
							href="mailto:hilalvisits@gmail.com"
							target="blank"
							startIcon={<MailOutline />}
						>
							Email
						</Button>
					</div>
				</div>
			</div>
			<ScrollToTopButton />
		</div>
	)
}

function BrandWithSocials() {
	return (
		<div>
			<h1
				className={cn(
					whisper.className,
					'flex h-full items-center justify-center md:h-auto',
					'z-50 whitespace-nowrap text-6xl font-normal text-white md:text-7xl'
				)}
			>
				{' '}
				Hilal Visits
			</h1>
			<div className="flex justify-center">
				{SOCIAL_MENU_ITEMS.map((item, i) => {
					const Icon = item.icon
					return (
						<IconButton
							key={i + item.title}
							LinkComponent={Link}
							href={item.href ?? '/'}
							color="inherit"
						>
							<Icon />
						</IconButton>
					)
				})}
			</div>
		</div>
	)
}

function ScrollToTopButton() {
	return (
		<div className="flex md:block md:justify-end">
			<Tooltip title="En başa git">
				<IconButton
					onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
					color="inherit"
					sx={{ border: '1px solid white', padding: '4px' }}
				>
					<KeyboardArrowUp />
				</IconButton>
			</Tooltip>
		</div>
	)
}
