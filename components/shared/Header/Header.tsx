'use client'
import { SOCIAL_MENU_ITEMS } from '@/constants'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import MailOutline from '@mui/icons-material/MailOutline'
import YouTube from '@mui/icons-material/YouTube'
import Instagram from '@mui/icons-material/Instagram'
import X from '@mui/icons-material/X'
import Link from 'next/link'
import './styles.css'

const ICON_MAP = {
	instagram: <Instagram />,
	twitter: <X />,
	youtube: <YouTube />
}
export default function Header() {
	return (
		<div className="w-full bg-amber-400 text-white">
			<div className="mx-auto flex max-w-[1200px] justify-between">
				<div className="hidden w-[15%] justify-start gap-1 md:flex md:w-[25%] md:gap-2">
					{SOCIAL_MENU_ITEMS.map((item, i) => {
						return (
							<IconButton
								key={i + item.title}
								LinkComponent={Link}
								href={item.href ?? '/'}
								color="inherit"
								size="small"
							>
								{ICON_MAP[item.icon as keyof typeof ICON_MAP]}
							</IconButton>
						)
					})}
				</div>
				<div className="hidden w-[15%] justify-end md:flex md:w-[25%]">
					<Button
						href="mailto:hilalvisits@gmail.com"
						startIcon={<MailOutline />}
						sx={{ color: 'white' }}
					>
						Contact
					</Button>
				</div>
			</div>
		</div>
	)
}
