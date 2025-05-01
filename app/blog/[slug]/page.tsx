import { BlogDetail as FeatureBlogDetail } from '@/components'
import { destructureBlogProps } from '@/utils'
import { getBlockChildren, getBlogBySlug } from '@/utils/notion'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const blog = await getBlogBySlug(slug)

	if (!blog) return {}

	const { title: blogTitle, description: blogDescription } = destructureBlogProps(blog)

	const title = `Hilal Visits | ${blogTitle}`
	const description = blogDescription

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'article',
			authors: 'Hilal Kulüp'
			//TODO: add tags & seo props to notion
			// tags
		}
	}
}

export default async function BlogDetail({ params }: Props) {
	const { slug } = await params
	const blog = await getBlogBySlug(slug)

	if (!blog) return notFound()
	const blogContents = await getBlockChildren(blog.id)

	return <FeatureBlogDetail blog={blog} blogContents={blogContents} />
}
