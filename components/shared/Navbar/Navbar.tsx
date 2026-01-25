import prismicClient from '@/lib/prismic'
import { NavbarClient } from './sections'
import { CategoryPageDocument, MenuItemType } from '@/types/prismic-types'
import { recursiveMenuItemMapper } from '@/utils/menu-item-mapper'

export default async function Navbar() {
	const categoryDocs = await prismicClient
		.getAllByType<CategoryPageDocument>('category')
		.catch(err => [] as CategoryPageDocument[])

	const mainCategoryDocs = categoryDocs?.filter(c => !c.data.parent_category?.data)
	const menuItems: MenuItemType[] = mainCategoryDocs.map(m =>
		recursiveMenuItemMapper(m, categoryDocs)
	)

	return <NavbarClient menuItems={menuItems} />
}
