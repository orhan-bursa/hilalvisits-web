'use client'

import Button, { ButtonProps } from '@mui/material/Button'
import Link from 'next/link'

/**
 * MUI Button rendered as a Next.js <Link>.
 *
 * Server components can't pass `LinkComponent={Link}` across the client boundary
 * (functions aren't serializable), so the Link is attached here on the client side.
 */
const LinkButton: React.FC<ButtonProps & { href: string }> = props => (
	<Button LinkComponent={Link} {...props} />
)

export default LinkButton
