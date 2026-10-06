import { BlogPageDocument, CategoryPageDocument, InfoPageDocument } from '@/types/prismic-types'
import * as prismic from '@prismicio/client'
import { createClient } from './client'

// const LANG_MAPPER: Record<LocaleAll, string> = {
// 	en: 'en-us',
// 	tr: 'tr'
// }

export const getBlogs = async () => {
	const client = createClient()

	return client.getAllByType<BlogPageDocument>('blog', {
		orderings: {
			field: 'document.first_publication_date',
			direction: 'desc'
		},
		fetchLinks: ['category.parent_category', 'category.title']
	})
}
export const getBlogByUID = async (uid: string) => {
	const client = createClient()

	return client.getByUID<BlogPageDocument>('blog', uid)
}

export const getCategories = async () => {
	const client = createClient()

	return client.getAllByType<CategoryPageDocument>('category', {
		orderings: [
			{
				field: 'my.category.order',
				direction: 'asc'
			}
		]
	})
}
export const getCategoryByUID = async (uid: string) => {
	const client = createClient()

	return client.getByUID<CategoryPageDocument>('category', uid)
}
export const getSubCategoriesByParentID = async (id: string) => {
	const client = createClient()

	return client.getAllByType<CategoryPageDocument>('category', {
		filters: [prismic.filter.at('my.category.parent_category', id)]
	})
}
export const getParentCategories = async () => {
	const client = createClient()

	return client.getAllByType<CategoryPageDocument>('category', {
		filters: [prismic.filter.missing('my.category.parent_category')],
		orderings: [
			{
				field: 'my.category.order',
				direction: 'asc'
			}
		]
	})
}

export const getInfoPages = async () => {
	const client = createClient()

	return client.getAllByType<InfoPageDocument>('info_page', {
		orderings: {
			field: 'document.first_publication_date',
			direction: 'desc'
		}
	})
}

export const getInfoPageByUID = async (uid: string) => {
	const client = createClient()

	return client.getByUID<InfoPageDocument>('info_page', uid)
}
