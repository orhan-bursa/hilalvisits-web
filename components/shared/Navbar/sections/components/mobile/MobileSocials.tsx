import { SOCIAL_MENU_ITEMS } from '@/constants'
import { MailOutline } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import Link from 'next/link'
import { useMobileMenu } from '../../MenuContext'
import { X, YouTube, Instagram } from '@mui/icons-material'

const ICON_MAP = {
	instagram: <Instagram />,
	twitter: <X />,
	youtube: <YouTube />
}

export default function MobileSocials() {
	const { setOpen } = useMobileMenu()
	return (
		<div
			className="mt-12 flex w-full items-center justify-between p-2 text-black"
			onClick={() => setOpen(false)}
		>
			<div className="flex">
				{SOCIAL_MENU_ITEMS.map((item, i) => {
					return (
						<IconButton
							key={i + item.title}
							LinkComponent={Link}
							href={item.href ?? '/'}
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
			<IconButton size="small" href="mailto:hilalvisits@gmail.com" sx={{ color: 'black' }}>
				<MailOutline />
			</IconButton>
		</div>
	)
}
