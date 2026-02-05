import BlogsPageContent from '@/components/features/Blogs/BlogsPageContent'
import { getBlogs, getCategories } from '@/lib/prismic/services'
import { MenuItemType } from '@/types/prismic-types'
import { recursiveMenuItemMapper } from '@/utils/menu-item-mapper'
import { Metadata, NextPage, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Hilal Visits | Hilalin Seyahat Blogu',
	description: 'Türkiye ve dünyadan kareler paylaşan unutulmaz bir gezi rehberi.'
	//TODO: expand metadata and add meta images / socail media url images
}

const BlogsPage: NextPage = async () => {
	const blogs = await getBlogs('tr')

	const categories = await getCategories('tr')
	const mainCategories = categories?.filter(c => !c.data.parent_category?.data)
	const menuItems: MenuItemType[] = mainCategories.map(m => recursiveMenuItemMapper(m, categories))

	if (!blogs?.length) return notFound()

	return <BlogsPageContent blogs={blogs} menuItems={menuItems} />
}

export default BlogsPage
