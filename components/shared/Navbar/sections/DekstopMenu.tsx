import { SOCIAL_MENU_ITEMS } from '@/constants'
import { Instagram, MailOutline, X, YouTube } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { MainMenuItem } from './components/main'
import Link from 'next/link'
import { MenuItemType } from '@/types/prismic-types'
import { getTranslations } from 'next-intl/server'

const ICON_MAP = {
	instagram: <Instagram />,
	twitter: <X />,
	youtube: <YouTube />
}

export default async function DesktopMenu({ menuItems }: { menuItems: MenuItemType[] }) {
	const t = await getTranslations('Navbar')
	return (
		<div className="hidden grow items-end justify-between uppercase md:flex">
			<div className="flex">
				<MainMenuItem
					item={{
						path: '/blog',
						title: t('discover'),
						uid: '',
						items: menuItems
					}}
				/>
				<Link href={'/galeri'}>
					<div className="relative flex cursor-pointer px-2 pb-1 font-semibold duration-300 hover:text-amber-500">
						<p>{t('gallery')}</p>
					</div>
				</Link>
				<Link href={'/hakkimda'}>
					<div className="relative flex cursor-pointer px-2 pb-1 font-semibold duration-300 hover:text-amber-500">
						<p>Hakkımda</p>
					</div>
				</Link>
			</div>
			<div className="flex gap-2 md:hidden lg:flex">
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
								color: 'black',
								transition: 'all 400ms ease',
								'&:hover': {
									color: '#FBBF24',
									backgroundColor: 'transparent'
								}
							}}
						>
							{ICON_MAP[item.icon as keyof typeof ICON_MAP]}
						</IconButton>
					)
				})}
				<div className="w-min border-l-[1px] border-black px-2">
					<IconButton
						href="mailto:hilalvisits@gmail.com"
						sx={{
							height: 28,
							width: 28,
							color: 'black',
							transition: 'all 400ms ease',
							'&:hover': {
								color: '#FBBF24',
								backgroundColor: 'transparent'
							}
						}}
					>
						<MailOutline />
					</IconButton>
				</div>
			</div>
		</div>
	)
}
