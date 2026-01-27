import { SOCIAL_MENU_ITEMS } from '@/constants'
import { whisper } from '@/utils/fonts'
import { X, YouTube, Instagram } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import cn from 'classnames'
import Link from 'next/link'

const ICON_MAP = {
	instagram: <Instagram />,
	twitter: <X />,
	youtube: <YouTube />
}
const BrandWithSocials: React.FC = () => {
	return (
		<div>
			<h1
				className={cn(
					whisper.className,
					'flex h-full items-center justify-center md:h-auto',
					'z-50 whitespace-nowrap text-6xl font-normal text-white md:text-7xl'
				)}
			>
				Hilal Visits
			</h1>
			<div className="flex justify-center">
				{SOCIAL_MENU_ITEMS.map((item, i) => {
					return (
						<IconButton
							key={i + item.title}
							LinkComponent={Link}
							href={item.href ?? '/'}
							target="_blank"
							color="inherit"
						>
							{ICON_MAP[item.icon as keyof typeof ICON_MAP]}
						</IconButton>
					)
				})}
			</div>
		</div>
	)
}

export default BrandWithSocials
