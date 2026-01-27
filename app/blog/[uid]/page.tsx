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

export default async function BlogDetail({ params }: Props) {
	const { uid } = await params

	const blog = await prismicClient.getByUID<BlogPageDocument>('blog', uid).catch(() => null)

	if (!blog) return notFound()

	return <FeatureBlogDetail blog={blog} />
}
