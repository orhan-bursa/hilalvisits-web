import { CategoryHeader, CategoryBlogs } from './sections'
import { BlogPageDocument } from '@/types/prismic-types'

interface IPropTypes {
	blogs: BlogPageDocument[]
	slug?: string
}
export default function Category({ blogs, slug }: IPropTypes) {
	return (
		<div className="my-8 space-y-6 md:space-y-12">
			<CategoryHeader slug={slug} />
			<CategoryBlogs blogs={blogs} />
		</div>
	)
}
