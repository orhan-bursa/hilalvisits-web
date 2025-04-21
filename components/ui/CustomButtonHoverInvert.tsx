import { Button, ButtonProps } from '@mui/material'
import React from 'react'

const CustomButtonHoverInvert: React.FC<ButtonProps> = ({ children, ...props }) => {
	return (
		<Button
			color="inherit"
			{...props}
			sx={{
				px: 2,
				py: 1,
				color: '#fbbf24',
				backgroundColor: 'transparent',
				boxShadow: 'none',
				border: 2,
				borderColor: '#fbbf24',
				borderRadius: 0,
				transition: 'all 700ms',
				':hover': {
					borderWidth: 2,
					backgroundColor: '#fbbf24',
					color: '#fff',
					borderRadius: '6px'
				},
				...props.sx
			}}
		>
			{children}
		</Button>
	)
}

export default CustomButtonHoverInvert
