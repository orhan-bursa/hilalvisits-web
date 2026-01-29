import { LocaleAll } from '@/types/locale'
import { BlogPageDocument, CategoryPageDocument } from '@/types/prismic-types'
import { ClientConfig, createClient, getRepositoryEndpoint } from '@prismicio/client'
import * as prismic from '@prismicio/client'

const LANG_MAPPER: Record<LocaleAll, string> = {
	en: 'en-us',
	tr: 'tr'
}

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

export const getBlogs = async (locale: LocaleAll) => {
	const client = createClient(endpoint, config)

	return client.getAllByType<BlogPageDocument>('blog', {
		lang: LANG_MAPPER[locale],
		orderings: {
			field: 'document.first_publication_date',
			direction: 'desc'
		}
	})
}
export const getBlogByUID = async (uid: string, locale: LocaleAll) => {
	const client = createClient(endpoint, config)

	return client.getByUID<BlogPageDocument>('blog', uid, {
		lang: LANG_MAPPER[locale]
	})
}

export const getCategories = async (locale: LocaleAll) => {
	const client = createClient(endpoint, config)

	return client.getAllByType<CategoryPageDocument>('category', {
		lang: LANG_MAPPER[locale],
		orderings: {
			field: 'document.first_publication_date',
			direction: 'desc'
		}
	})
}
export const getCategoryByUID = async (uid: string, locale: LocaleAll) => {
	const client = createClient(endpoint, config)

	return client.getByUID<CategoryPageDocument>('category', uid, {
		lang: LANG_MAPPER[locale]
	})
}
export const getSubCategoriesByParentID = async (id: string, locale: LocaleAll) => {
	const client = createClient(endpoint, config)

	return client.getAllByType<CategoryPageDocument>('category', {
		lang: LANG_MAPPER[locale],
		filters: [prismic.filter.at('my.category.parent_category', id)]
	})
}
export const getParentCategories = async (locale: LocaleAll) => {
	const client = createClient(endpoint, config)

	return client.getAllByType<CategoryPageDocument>('category', {
		lang: LANG_MAPPER[locale],
		filters: [prismic.filter.missing('my.category.parent_category')]
	})
}
