import BlogDetailPageContent from '@/components/features/BlogDetail/BlogDetailPageContent'
import { getBlogByUID, getBlogs } from '@/lib/prismic/services'
import { NextPage } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 86400 // 60 * 60 * 24 => 1 day

type Props = {
	params: Promise<{ uid: string }>
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
