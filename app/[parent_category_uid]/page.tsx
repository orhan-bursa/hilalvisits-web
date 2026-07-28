import CategoryPageContent from '@/components/features/Category/CategoryPageContent'
import { getBlogs, getCategoryByUID, getSubCategoriesByParentID } from '@/lib/prismic/services'
import { buildPrismicPageMetadata } from '@/lib/seo/metadata'
import { Metadata, NextPage } from 'next'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ parent_category_uid: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { parent_category_uid } = await params
	const category = await getCategoryByUID(parent_category_uid).catch(() => null)

	if (!category) return {}

	return buildPrismicPageMetadata({
		metaTitle: category.data.meta_title,
		metaDescription: category.data.meta_description,
		metaImage: category.data.meta_image,
		path: `/${parent_category_uid}`,
		fallbackTitle: category.data.title
	})
}

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
