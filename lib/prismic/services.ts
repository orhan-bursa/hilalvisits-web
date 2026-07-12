import { BlogPageDocument, CategoryPageDocument, InfoPageDocument } from '@/types/prismic-types'
import { ClientConfig, createClient, getRepositoryEndpoint } from '@prismicio/client'
import * as prismic from '@prismicio/client'

// const LANG_MAPPER: Record<LocaleAll, string> = {
// 	en: 'en-us',
// 	tr: 'tr'
// }

const endpoint = getRepositoryEndpoint('hilal-visits-cms')
const config: ClientConfig = {
	fetchOptions:
		process.env.NODE_ENV === 'production'
			? {
					cache: 'force-cache',
					next: { revalidate: 60 * 60 * 24 }
				}
			: { cache: 'no-store' }
}

export const getBlogs = async () => {
	const client = createClient(endpoint, config)

	return client.getAllByType<BlogPageDocument>('blog', {
		orderings: {
			field: 'document.first_publication_date',
			direction: 'desc'
		},
		fetchLinks: ['category.parent_category', 'category.title']
	})
}
export const getBlogByUID = async (uid: string) => {
	const client = createClient(endpoint, config)

	return client.getByUID<BlogPageDocument>('blog', uid)
}

export const getCategories = async () => {
	const client = createClient(endpoint, config)

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
	const client = createClient(endpoint, config)

	return client.getByUID<CategoryPageDocument>('category', uid)
}
export const getSubCategoriesByParentID = async (id: string) => {
	const client = createClient(endpoint, config)

	return client.getAllByType<CategoryPageDocument>('category', {
		filters: [prismic.filter.at('my.category.parent_category', id)]
	})
}
export const getParentCategories = async () => {
	const client = createClient(endpoint, config)

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
	const client = createClient(endpoint, config)

	return client.getAllByType<InfoPageDocument>('info_page', {
		orderings: {
			field: 'document.first_publication_date',
			direction: 'desc'
		}
	})
}

export const getInfoPageByUID = async (uid: string) => {
	const client = createClient(endpoint, config)

	return client.getByUID<InfoPageDocument>('info_page', uid)
}
