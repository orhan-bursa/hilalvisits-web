import { BlogGrid, BlogHeader } from './sections'
import { BlogPageDocument, MenuItemType } from '@/types/prismic-types'

export default async function Blogs({
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
