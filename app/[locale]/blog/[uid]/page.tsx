import BlogDetailPageContent from '@/components/features/BlogDetail/BlogDetailPageContent'
import { getBlogByUID, getBlogs } from '@/lib/prismic/services'
import { LocaleDynamic } from '@/types/locale'
import { NextPage } from 'next'
import { notFound } from 'next/navigation'

export const dynamicParams = true
export const revalidate = 86400 // 60 * 60 * 24 => 1 day

type Props = {
	params: Promise<{ locale: LocaleDynamic; uid: string }>
}

const BlogDetailPageWithLocale: NextPage<Props> = async ({ params }) => {
	const { locale, uid } = await params

	const blog = await getBlogByUID(uid, locale)

	if (!blog) return notFound()

	return <BlogDetailPageContent blog={blog} />
}

export default BlogDetailPageWithLocale

export async function generateStaticParams() {
	//map each locales config if more than one is added
	const blogs = await getBlogs('en')

	return blogs.map(blog => ({
		uid: blog.uid,
		locale: 'en'
	}))
}
