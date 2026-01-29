import BlogsPageContent from '@/components/features/Blogs/BlogsPageContent'
import { getBlogs, getCategories } from '@/lib/prismic/services'
import { MenuItemType } from '@/types/prismic-types'
import { recursiveMenuItemMapper } from '@/utils/menu-item-mapper'
import { NextPage } from 'next'
import { notFound } from 'next/navigation'

const BlogsPage: NextPage = async () => {
	const blogs = await getBlogs('tr')

	const categories = await getCategories('tr')
	const mainCategories = categories?.filter(c => !c.data.parent_category?.data)
	const menuItems: MenuItemType[] = mainCategories.map(m => recursiveMenuItemMapper(m, categories))

	if (!blogs?.length) return notFound()

	return <BlogsPageContent blogs={blogs} menuItems={menuItems} />
}

export default BlogsPage
