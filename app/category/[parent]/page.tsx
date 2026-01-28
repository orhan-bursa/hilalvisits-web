import prismicClient from '@/lib/prismic'
import { BlogPageDocument, CategoryPageDocument } from '@/types/prismic-types'
import { notFound } from 'next/navigation'
import * as prismic from '@prismicio/client'
import CategoryPageContent from '@/components/features/Category/CategoryPageContent'

type Props = { params: Promise<{ parent: string }> }

export default async function ParentCategory({ params }: Props) {
	const { parent: slug } = await params
	const parentCategory = await prismicClient
		.getByUID<CategoryPageDocument>('category', slug)
		.catch(() => null)

	if (!parentCategory) return notFound()

	const subCategories = await prismicClient.getAllByType<CategoryPageDocument>('category', {
		filters: [prismic.filter.at('my.category.parent_category', parentCategory.id)]
	})

	const blogs = await prismicClient.getAllByType<BlogPageDocument>('blog')
	const filteredBlogs = blogs.filter(b =>
		subCategories.some(c => c.data.title === b.data.category.data.title)
	)

	if (!filteredBlogs?.length) return notFound()

	return <CategoryPageContent blogs={filteredBlogs} slug={slug} />
}
