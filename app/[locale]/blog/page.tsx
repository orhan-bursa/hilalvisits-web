import BlogsPageContent from '@/components/features/Blogs/BlogsPageContent'
import { getBlogs, getCategories } from '@/lib/prismic/services'
import { LocaleDynamic } from '@/types/locale'
import { MenuItemType } from '@/types/prismic-types'
import { recursiveMenuItemMapper } from '@/utils/menu-item-mapper'
import { NextPage } from 'next'
import { notFound } from 'next/navigation'

type Props = {
	params: Promise<{ locale: LocaleDynamic }>
}

const BlogsPageWithLocale: NextPage<Props> = async ({ params }) => {
	const { locale } = await params
	const blogs = await getBlogs(locale)

	const categories = await getCategories(locale)
	const mainCategories = categories?.filter(c => !c.data.parent_category?.data)
	const menuItems: MenuItemType[] = mainCategories.map(m => recursiveMenuItemMapper(m, categories))

	if (!blogs?.length) return notFound()

	return <BlogsPageContent blogs={blogs} menuItems={menuItems} />
}

export default BlogsPageWithLocale
