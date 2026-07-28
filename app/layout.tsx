import { Footer, Navbar } from '@/components'
import Instagram from '@/components/shared/Instagram'
import {
	DEFAULT_OG_IMAGE,
	SITE_DESCRIPTION,
	SITE_NAME,
	SITE_URL
} from '@/constants/site'
import { getCategories, getInfoPages } from '@/lib/prismic/services'
import { CategoryPageDocument, InfoPageDocument, MenuItemType } from '@/types/prismic-types'
import { jost } from '@/utils/fonts'
import { recursiveMenuItemMapper } from '@/utils/menu-item-mapper'
import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: `${SITE_NAME} | Hilalin Seyahat Rehberi`,
		template: `%s | ${SITE_NAME}`
	},
	description: SITE_DESCRIPTION,
	openGraph: {
		type: 'website',
		locale: 'tr_TR',
		siteName: SITE_NAME,
		title: `${SITE_NAME} | Hilalin Seyahat Rehberi`,
		description: SITE_DESCRIPTION,
		images: [
			{
				url: DEFAULT_OG_IMAGE,
				alt: SITE_NAME
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: `${SITE_NAME} | Hilalin Seyahat Rehberi`,
		description: SITE_DESCRIPTION,
		images: [DEFAULT_OG_IMAGE]
	}
}

export default async function RootLayoutDefault({ children }: { children: React.ReactNode }) {
	const categories = await getCategories().catch(err => [] as CategoryPageDocument[])
	const infoPages = await getInfoPages().catch(err => [] as InfoPageDocument[])

	const mainCategories = categories?.filter(c => !c.data.parent_category?.data)
	const menuItems: MenuItemType[] = mainCategories.map(m => recursiveMenuItemMapper(m, categories))

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
				<div className="relative flex min-h-screen flex-col">
					<Navbar menuItems={menuItems} />
					<div className="grow">{children}</div>
					<Instagram />
					<Footer menuItems={menuItems} infoPages={infoPages} />
				</div>
			</body>
		</html>
	)
}
