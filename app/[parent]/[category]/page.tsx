import { Category as FeatureCategory } from '@/components'

import { notFound } from 'next/navigation'
import prismicClient from '@/lib/prismic'
import { BlogPageDocument, CategoryPageDocument } from '@/types/prismic-types'

type Props = { params: Promise<{ parent: string; category: string }> }

export default async function Category({ params }: Props) {
	const { category: slug } = await params

	const category = await prismicClient
		.getByUID<CategoryPageDocument>('category', slug)
		.catch(() => null)

	if (!category) return notFound()

	const blogs = await prismicClient.getAllByType<BlogPageDocument>('blog')
	const filteredBlogs = blogs.filter(b => category.data.title === b.data.category.data.title)

	return <FeatureCategory blogs={filteredBlogs} slug={slug} />
}
