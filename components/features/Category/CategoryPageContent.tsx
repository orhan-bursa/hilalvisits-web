import { BlogPageDocument, CategoryPageDocument } from '@/types/prismic-types'
import CategoryHeader from './sections/CategoryHeader'
import CategoryBlogs from './sections/CategoryBlogs'
import { LocaleAll } from '@/types/locale'

type Props = {
	blogs: BlogPageDocument[]
	category: CategoryPageDocument
	subCategories?: CategoryPageDocument[]
}
export default function CategoryPageContent({ blogs, category, subCategories }: Props) {
	return (
		<div className="my-8 space-y-6 md:space-y-12">
			<CategoryHeader category={category} subCategories={subCategories} />
			<CategoryBlogs blogs={blogs} />
		</div>
	)
}
