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
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
				<link rel="manifest" href="/favicon/site.webmanifest" />
			</head>
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
