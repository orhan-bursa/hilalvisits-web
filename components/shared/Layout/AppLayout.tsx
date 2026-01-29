import { Footer, Navbar } from '@/components'
import { jost } from '@/utils/fonts'
import Instagram from '@/components/shared/Instagram'
import { CategoryPageDocument, MenuItemType } from '@/types/prismic-types'
import { recursiveMenuItemMapper } from '@/utils/menu-item-mapper'
import { LocaleAll } from '@/types/locale'
import { getCategories } from '@/lib/prismic/services'

type Props = { locale: LocaleAll; children: React.ReactNode }

const AppLayout: React.FC<Props> = async ({ locale, children }) => {
	const categories = await getCategories(locale).catch(err => [] as CategoryPageDocument[])

	const mainCategories = categories?.filter(c => !c.data.parent_category?.data)
	const menuItems: MenuItemType[] = mainCategories.map(m => recursiveMenuItemMapper(m, categories))

	return (
		<html lang={locale} className={jost.className}>
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
				<link rel="manifest" href="/favicon/site.webmanifest" />
			</head>
			<body>
				<div className="relative">
					<Navbar menuItems={menuItems} />
					{children}
					<Instagram />
					<Footer menuItems={menuItems} />
				</div>
			</body>
		</html>
	)
}

export default AppLayout
