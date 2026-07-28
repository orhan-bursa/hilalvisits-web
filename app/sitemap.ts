import { SITE_URL } from '@/constants/site'
import { getBlogs, getCategories, getInfoPages } from '@/lib/prismic/services'
import type { MetadataRoute } from 'next'

export const revalidate = 86400

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [blogs, categories, infoPages] = await Promise.all([
		getBlogs(),
		getCategories(),
		getInfoPages()
	])

	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: SITE_URL,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1
		},
		{
			url: `${SITE_URL}/blog`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.9
		},
		{
			url: `${SITE_URL}/about`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.7
		}
	]

	const blogRoutes: MetadataRoute.Sitemap = blogs.map(blog => ({
		url: `${SITE_URL}/blog/${blog.uid}`,
		lastModified: new Date(blog.last_publication_date),
		changeFrequency: 'monthly',
		priority: 0.8
	}))

	const parentCategories = categories.filter(category => !category.data.parent_category?.uid)
	const parentCategoryRoutes: MetadataRoute.Sitemap = []

	for (const parent of parentCategories) {
		const subCategories = categories.filter(
			category => category.data.parent_category?.uid === parent.uid
		)
		const hasBlogs = blogs.some(blog =>
			subCategories.some(subCategory => subCategory.uid === blog.data.category.uid)
		)

		if (hasBlogs) {
			parentCategoryRoutes.push({
				url: `${SITE_URL}/${parent.uid}`,
				lastModified: new Date(parent.last_publication_date),
				changeFrequency: 'weekly',
				priority: 0.8
			})
		}
	}

	const subCategoryRoutes: MetadataRoute.Sitemap = categories
		.filter(category => category.data.parent_category?.uid)
		.map(category => ({
			url: `${SITE_URL}/${category.data.parent_category.uid}/${category.uid}`,
			lastModified: new Date(category.last_publication_date),
			changeFrequency: 'weekly',
			priority: 0.7
		}))

	const infoPageRoutes: MetadataRoute.Sitemap = infoPages.map(infoPage => ({
		url: `${SITE_URL}/-/${infoPage.uid}`,
		lastModified: new Date(infoPage.last_publication_date),
		changeFrequency: 'yearly',
		priority: 0.3
	}))

	return [
		...staticRoutes,
		...blogRoutes,
		...parentCategoryRoutes,
		...subCategoryRoutes,
		...infoPageRoutes
	]
}
