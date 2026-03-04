'use client'
import { KeyboardArrowUp } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { useTranslations } from 'next-intl'

type Props = {
	tooltipText: string
}
const ScrollToTopButton: React.FC<Props> = ({ tooltipText }) => {
	return (
		<div className="flex md:block md:justify-end">
			<Tooltip title={tooltipText}>
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

export default ScrollToTopButton
