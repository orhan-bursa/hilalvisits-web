import { Blogs as FeatureBlogs } from '@/components/features'
import prismicClient from '@/lib/prismic'
import { BlogPageDocument, CategoryPageDocument, MenuItemType } from '@/types/prismic-types'
import { recursiveMenuItemMapper } from '@/utils/menu-item-mapper'
import { notFound } from 'next/navigation'

export default async function Blog() {
	const blogs = await prismicClient.getAllByType<BlogPageDocument>('blog')

	const categoryDocs = await prismicClient
		.getAllByType<CategoryPageDocument>('category')
		.catch(err => [] as CategoryPageDocument[])

	const mainCategoryDocs = categoryDocs?.filter(c => !c.data.parent_category?.data)
	const menuItems: MenuItemType[] = mainCategoryDocs.map(m =>
		recursiveMenuItemMapper(m, categoryDocs)
	)

	if (!blogs?.length) return notFound()

	return <FeatureBlogs blogs={blogs} menuItems={menuItems} />
}
