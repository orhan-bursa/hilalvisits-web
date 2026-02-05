import BlogDetailPageContent from '@/components/features/BlogDetail/BlogDetailPageContent'
import { getBlogByUID, getBlogs } from '@/lib/prismic/services'
import { asImageSrc, asText } from '@prismicio/client'
import { Metadata, NextPage, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 86400 // 60 * 60 * 24 => 1 day

type Props = {
	params: Promise<{ uid: string }>
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { uid } = await params

	const blog = await getBlogByUID(uid, 'tr')

	return {
		title: blog?.data?.meta_title,
		description: blog?.data.meta_description,
		openGraph: {
			images: [
				{
					url: asImageSrc(blog.data.meta_image) ?? '',
					width: 800,
					height: 600,
					alt: blog?.data?.meta_image?.alt || ''
				}
			]
		}
	}
}

const BlogDetailPage: NextPage<Props> = async ({ params }) => {
	const { uid } = await params

	const blog = await getBlogByUID(uid, 'tr')

	if (!blog) return notFound()

	return <BlogDetailPageContent blog={blog} />
}

export default BlogDetailPage

export async function generateStaticParams() {
	const blogs = await getBlogs('tr')

	return blogs.map(blog => ({
		uid: blog.uid
	}))
}
