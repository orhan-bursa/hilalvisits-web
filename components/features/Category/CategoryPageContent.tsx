import { BlogPageDocument } from '@/types/prismic-types'
import CategoryHeader from './sections/CategoryHeader'
import CategoryBlogs from './sections/CategoryBlogs'

interface IPropTypes {
	blogs: BlogPageDocument[]
	slug?: string
}
export default function CategoryPageContent({ blogs, slug }: IPropTypes) {
	return (
		<div className="my-8 space-y-6 md:space-y-12">
			<CategoryHeader slug={slug} />
			<CategoryBlogs blogs={blogs} />
		</div>
	)
}
