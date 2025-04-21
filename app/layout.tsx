import type { Metadata } from 'next'
import { Footer, Navbar } from '@/components'
import './globals.css'
import { jost } from '@/utils/fonts'
import Instagram from '@/components/shared/Instagram'

export const metadata: Metadata = {
	title: 'Hilal Visits',
	description: 'Your go to blog for traveling adventures!'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="tr" className={jost.className}>
			<body>
				<div className="relative">
					<Navbar />
					{children}
					<Instagram />
					<Footer />
				</div>
			</body>
		</html>
	)
}
