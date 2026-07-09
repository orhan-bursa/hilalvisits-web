import { notFound } from 'next/navigation'
import CategoryPageContent from '@/components/features/Category/CategoryPageContent'
import { NextPage } from 'next'
import { getBlogs, getCategoryByUID, getSubCategoriesByParentID } from '@/lib/prismic/services'

type Props = { params: Promise<{ parent_category_uid: string }> }

const ParentCategoryPage: NextPage<Props> = async ({ params }) => {
	const { parent_category_uid: parentUID } = await params
	const parentCategory = await getCategoryByUID(parentUID).catch(() => null)

	if (!parentCategory) return notFound()

	const subCategories = await getSubCategoriesByParentID(parentCategory.id)

	const blogs = await getBlogs()
	const filteredBlogs = blogs.filter(b => subCategories.some(c => c.uid === b.data.category.uid))

	if (!filteredBlogs?.length) return notFound()

	return (
		<CategoryPageContent
			blogs={filteredBlogs}
			category={parentCategory}
			subCategories={subCategories}
		/>
	)
}

export default ParentCategoryPage
