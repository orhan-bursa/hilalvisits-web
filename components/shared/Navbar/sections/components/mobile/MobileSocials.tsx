import { SOCIAL_MENU_ITEMS } from '@/constants'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'
import MailOutline from '@mui/icons-material/MailOutline'
import YouTube from '@mui/icons-material/YouTube'
import Instagram from '@mui/icons-material/Instagram'
import X from '@mui/icons-material/X'

const ICON_MAP = {
	instagram: <Instagram />,
	twitter: <X />,
	youtube: <YouTube />
}

export default function MobileSocials() {
	return (
		<div className="sticky bottom-0 flex w-full items-center justify-between bg-white px-4 py-4">
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
			<IconButton size="small" href="mailto:hilalvisits@gmail.com" sx={{ color: 'black' }}>
				<MailOutline />
			</IconButton>
		</div>
	)
}
