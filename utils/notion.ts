import 'server-only'
import { array } from '.'
import { BlogPageObject, PhotoPageObject, MenuPageObject } from '@/types'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { InfoPageObject } from '@/types/page'

const NOTION_VERSION = '2022-06-28'

const {
	NOTION_SECRET,
	NOTION_BLOGS_DATABASE_ID,
	NOTION_MENUS_DATABASE_ID,
	NOTION_PHOTOS_DATABASE_ID,
	NOTION_PAGES_DATABASE_ID
} = process.env

const headers: HeadersInit = {
	Authorization: `Bearer ${NOTION_SECRET}`,
	'Content-Type': 'application/json',
	'Notion-Version': NOTION_VERSION
}

const next = { revalidate: 60 } //{ revalidate: 60 * 60 } // 60 * 60 * 1 -> 1 hour
const baseUrl = 'https://api.notion.com/v1'

const fetchConfig: RequestInit = {
	headers,
	// cache: "no-store",
	next
}

export async function getBlogs(filter?: { menu_slug?: string }) {
	const filterQuery: any[] = [
		{
			property: 'status',
			status: {
				equals: 'published'
			}
		}
	]

	if (filter)
		filterQuery.push({
			property: 'menu_path',
			rollup: {
				any: {
					rich_text: {
						contains: filter.menu_slug
					}
				}
			}
		})

	const url = `${baseUrl}/databases/${NOTION_BLOGS_DATABASE_ID}/query`
	const data = await fetch(url, {
		...fetchConfig,
		method: 'POST',
		body: JSON.stringify({
			filter: {
				and: filterQuery
			}
		})
	})
		.then(res => res.json())
		.catch(err => console.log(err))

	const blogs = array<BlogPageObject>(data?.results)

	return blogs
}

export async function getBlogBySlug(slug: string) {
	const url = `${baseUrl}/databases/${NOTION_BLOGS_DATABASE_ID}/query`
	const data = await fetch(url, {
		...fetchConfig,
		method: 'POST',
		body: JSON.stringify({
			filter: {
				and: [
					{
						property: 'status',
						status: {
							equals: 'published'
						}
					},
					{
						property: 'slug',
						rich_text: {
							equals: slug
						}
					}
				]
			}
		})
	})
		.then(res => res.json())
		.catch(err => console.log(err))

	const blogs = array<BlogPageObject>(data?.results)
	return blogs.length ? blogs[0] : undefined
}

export async function getMenus(depth?: number) {
	const url = `${baseUrl}/databases/${NOTION_MENUS_DATABASE_ID}/query`
	if (!depth) {
		const data = await fetch(url, {
			...fetchConfig,
			method: 'POST',
			body: JSON.stringify({})
		})
			.then(res => res.json())
			.catch(err => console.log(err))

		const menus = array<MenuPageObject>(data?.results)
		return menus
	} else {
		const filter = {
			property: 'depth',
			formula: {
				number: {
					equals: depth
				}
			}
		}

		const data = await fetch(url, {
			...fetchConfig,
			method: 'POST',
			body: JSON.stringify({
				filter
			})
		})
			.then(res => res.json())
			.catch(err => console.log(err))

		const menus = array<MenuPageObject>(data?.results)
		return menus
	}
}
export async function getMenuBySlug(slug: string) {
	const filter = {
		property: 'slug',
		rich_text: {
			equals: slug
		}
	}
	const url = `${baseUrl}/databases/${NOTION_MENUS_DATABASE_ID}/query`
	const data = await fetch(url, {
		...fetchConfig,
		method: 'POST',
		body: JSON.stringify({
			filter
		})
	})
		.then(res => res.json())
		.catch(err => console.log(err))

	const menu = array<MenuPageObject>(data?.results)[0]
	return menu
}

export async function getPhotos() {
	const url = `${baseUrl}/databases/${NOTION_PHOTOS_DATABASE_ID}/query`
	const data = await fetch(url, {
		...fetchConfig,
		method: 'POST',
		body: JSON.stringify({
			filter: {
				property: 'status',
				status: {
					equals: 'published'
				}
			}
		})
	})
		.then(res => res.json())
		.catch(err => console.log(err))

	const photos = array<PhotoPageObject>(data?.results)
	return photos
}

export async function getInfoPages() {
	const url = `${baseUrl}/databases/${NOTION_PAGES_DATABASE_ID}/query`
	const data = await fetch(url, {
		...fetchConfig,
		method: 'POST',
		body: JSON.stringify({
			filter: {
				property: 'status',
				status: {
					equals: 'published'
				}
			}
		})
	})
		.then(res => res.json())
		.catch(err => console.log(err))

	const photos = array<InfoPageObject>(data?.results)
	return photos
}
export async function getInfoPageBySlug(slug: string) {
	const filter = {
		property: 'slug',
		rich_text: {
			equals: slug!
		}
	}
	const url = `${baseUrl}/databases/${NOTION_PAGES_DATABASE_ID}/query`
	const data = await fetch(url, {
		...fetchConfig,
		method: 'POST',
		body: JSON.stringify({
			filter
		})
	})
		.then(res => res.json())
		.catch(err => console.log(err))

	const pages = array<InfoPageObject>(data?.results)
	return pages.length ? pages[0] : undefined
}

export async function getBlockChildren(id: string) {
	const url = `${baseUrl}/blocks/${id}/children`
	const data = await fetch(url, {
		...fetchConfig
	})
		.then(res => res.json())
		.catch(err => console.log(err))

	const blocks = array<BlockObjectResponse>(data?.results)
	return blocks
}
