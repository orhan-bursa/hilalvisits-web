import prismicClient from '@/lib/prismic'
import { BlogPageDocument, CategoryPageDocument } from '@/types/prismic-types'

export async function getCategoriesService() {
	try {
		const res = await prismicClient.getAllByType<CategoryPageDocument>('category')

		return res
	} catch (err) {
		console.log(err)
		throw err
	}
}

export async function getBlogsService() {
	try {
		const res = await prismicClient.getAllByType<BlogPageDocument>('blog')

		return res
	} catch (err) {
		console.log(err)
		throw err
	}
}
