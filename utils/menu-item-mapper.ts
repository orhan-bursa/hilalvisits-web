import { CategoryPageDocument, MenuItemType } from '@/types/prismic-types'

export const recursiveMenuItemMapper = (
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
