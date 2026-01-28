import { BlogPageDocument, MenuItemType } from '@/types/prismic-types'
import BlogHeader from './sections/BlogHeader'
import BlogGrid from './sections/BlogGrid'

export default async function BlogsPageContent({
	blogs,
	menuItems
}: {
	blogs: BlogPageDocument[]
	menuItems: MenuItemType[]
}) {
	return (
		<div className="my-8 space-y-6 md:space-y-12">
			<BlogHeader menuItems={menuItems} />
			<BlogGrid blogs={blogs} menuItems={menuItems} />
		</div>
	)
}
