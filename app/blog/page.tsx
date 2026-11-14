import BlogsPageContent from '@/components/features/Blogs/BlogsPageContent'
import { SITE_DESCRIPTION } from '@/constants/site'
import { getBlogs, getCategories } from '@/lib/prismic/services'
import { breadcrumbSchema, JsonLd } from '@/lib/seo/jsonld'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { MenuItemType } from '@/types/prismic-types'
import { recursiveMenuItemMapper } from '@/utils/menu-item-mapper'
import { Metadata, NextPage } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 86400 // 60 * 60 * 24 => 1 day

export const metadata: Metadata = buildPageMetadata({
	title: 'Hilalin Seyahat Blogu',
	description: SITE_DESCRIPTION,
	path: '/blog'
})

const BlogsPage: NextPage = async () => {
	const blogs = await getBlogs()

	const categories = await getCategories()
	const mainCategories = categories?.filter(c => !c.data.parent_category?.data)
	const menuItems: MenuItemType[] = mainCategories.map(m => recursiveMenuItemMapper(m, categories))

	if (!blogs?.length) return notFound()

	return (
		<>
			<JsonLd
				data={breadcrumbSchema([
					{ name: 'Ana Sayfa', path: '/' },
					{ name: 'Bloglar', path: '/blog' }
				])}
			/>
			<BlogsPageContent blogs={blogs} menuItems={menuItems} />
		</>
	)
}

export default BlogsPage
