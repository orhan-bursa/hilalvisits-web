import BlogDetailPageContent from '@/components/features/BlogDetail/BlogDetailPageContent'
import { getBlogByUID, getBlogs } from '@/lib/prismic/services'
import { buildPrismicPageMetadata } from '@/lib/seo/metadata'
import { asText } from '@prismicio/client'
import { Metadata, NextPage } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 86400 // 60 * 60 * 24 => 1 day

type Props = {
	params: Promise<{ uid: string }>
}

const BlogDetailPage: NextPage<Props> = async ({ params }) => {
	const { uid } = await params

	const blog = await getBlogByUID(uid).catch(_err => null)

	if (!blog) return notFound()

	return <BlogDetailPageContent blog={blog} />
}

export default BlogDetailPage

export async function generateStaticParams() {
	const blogs = await getBlogs()

	return blogs.map(blog => ({
		uid: blog.uid
	}))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { uid } = await params
	const blog = await getBlogByUID(uid).catch(_err => null)

	if (!blog) return {}

	const descriptionText = blog.data.description ? (asText(blog.data.description) || '').trim() : ''
	const fallbackDescription = descriptionText ? descriptionText.slice(0, 160) : undefined

	return buildPrismicPageMetadata({
		metaTitle: blog.data.meta_title,
		metaDescription: blog.data.meta_description,
		metaImage: blog.data.meta_image,
		fallbackImage: blog.data.cover,
		path: `/blog/${uid}`,
		fallbackTitle: blog.data.title,
		fallbackDescription,
		openGraphType: 'article'
	})
}
