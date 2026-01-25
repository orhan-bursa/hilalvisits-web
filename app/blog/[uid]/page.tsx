import { BlogDetail as FeatureBlogDetail } from '@/components'
import prismicClient from '@/lib/prismic'
import { BlogPageDocument } from '@/types/prismic-types'
import { destructureBlogProps } from '@/utils'
import { getBlockChildren, getBlogBySlug } from '@/utils/notion'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const dynamicParams = true
export const revalidate = 86400 // 60 * 60 * 24 => 1 day

export async function generateStaticParams() {
	const blogs = await prismicClient.getAllByType<BlogPageDocument>('blog')

	return blogs.map(blog => ({
		uid: blog.uid
	}))
}

type Props = {
	params: Promise<{ uid: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const blog = await getBlogBySlug(slug)

	if (!blog) return {}

	const { title: blogTitle, description: blogDescription } = destructureBlogProps(blog)

	const title = `Hilal Visits | ${blogTitle}`
	const description = blogDescription?.[0]?.plain_text

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
	const { uid } = await params

	const blog = await prismicClient.getByUID<BlogPageDocument>('blog', uid).catch(() => null)

	if (!blog) return notFound()

	return <FeatureBlogDetail blog={blog} />
}
