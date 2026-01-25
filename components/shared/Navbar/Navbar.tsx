import prismicClient from '@/lib/prismic'
import { NavbarClient } from './sections'
import { CategoryPageDocument, MenuItemType } from '@/types/prismic-types'

const recursiveMenuItemMapper = (
	doc: CategoryPageDocument,
	docsList: CategoryPageDocument[],
	parentPath?: string
) => {
	const path = parentPath ? `${parentPath}/${doc.uid}` : `/${doc.uid}`
	const content: MenuItemType = {
		uid: doc.uid,
		title: doc.data.title,
		path
	}
	const itemDocs = docsList.filter(d => d.data.parent_category?.data?.title === doc.data.title)

	if (itemDocs.length > 0) {
		content.items = itemDocs.map(item => recursiveMenuItemMapper(item, docsList, path))
	}

	return content
}
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
