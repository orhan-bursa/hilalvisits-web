import BlogDetailPageContent from '@/components/features/BlogDetail/BlogDetailPageContent'
import { getBlogByUID, getBlogs, getCategories } from '@/lib/prismic/services'
import { blogPostingSchema, breadcrumbSchema, BreadcrumbItem, JsonLd } from '@/lib/seo/jsonld'
import { buildPrismicPageMetadata, truncateAtWord } from '@/lib/seo/metadata'
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

	const breadcrumbs = await getBlogBreadcrumbs(blog)

	return (
		<>
			<JsonLd data={[blogPostingSchema(blog), breadcrumbSchema(breadcrumbs)]} />
			<BlogDetailPageContent blog={blog} />
		</>
	)
}

async function getBlogBreadcrumbs(blog: NonNullable<Awaited<ReturnType<typeof getBlogByUID>>>) {
	const items: BreadcrumbItem[] = [
		{ name: 'Ana Sayfa', path: '/' },
		{ name: 'Bloglar', path: '/blog' }
	]

	const category = blog.data.category
	const parentUID = category?.data?.parent_category?.uid
	if (category?.uid && parentUID) {
		const categories = await getCategories().catch(() => [])
		const parent = categories.find(c => c.uid === parentUID)
		if (parent) items.push({ name: parent.data.title, path: `/${parent.uid}` })
		items.push({ name: category.data.title, path: `/${parentUID}/${category.uid}` })
	}

	items.push({ name: blog.data.title, path: `/blog/${blog.uid}` })
	return items
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
	const fallbackDescription = descriptionText ? truncateAtWord(descriptionText, 160) : undefined

	return buildPrismicPageMetadata({
		metaTitle: blog.data.meta_title,
		metaDescription: blog.data.meta_description,
		metaImage: blog.data.meta_image,
		fallbackImage: blog.data.cover,
		path: `/blog/${uid}`,
		fallbackTitle: blog.data.title,
		fallbackDescription,
		openGraphType: 'article',
		article: {
			publishedTime: blog.data.publish_date || blog.first_publication_date,
			modifiedTime: blog.last_publication_date,
			section: blog.data.category?.data?.title
		}
	})
}
