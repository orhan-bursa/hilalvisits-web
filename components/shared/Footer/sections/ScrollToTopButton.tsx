'use client'
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

type Props = {}
const ScrollToTopButton: React.FC<Props> = () => {
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

export default ScrollToTopButton
