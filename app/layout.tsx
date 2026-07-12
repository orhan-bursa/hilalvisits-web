import { Footer, Navbar } from '@/components'
import Instagram from '@/components/shared/Instagram'

import { getCategories, getInfoPages } from '@/lib/prismic/services'
import { CategoryPageDocument, InfoPageDocument, MenuItemType } from '@/types/prismic-types'
import { jost } from '@/utils/fonts'
import { recursiveMenuItemMapper } from '@/utils/menu-item-mapper'

import './globals.css'

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
