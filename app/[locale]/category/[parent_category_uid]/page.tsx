import { notFound } from 'next/navigation'
import CategoryPageContent from '@/components/features/Category/CategoryPageContent'
import { NextPage } from 'next'
import { getBlogs, getCategoryByUID, getSubCategoriesByParentID } from '@/lib/prismic/services'
import { LocaleDynamic } from '@/types/locale'

type Props = { params: Promise<{ locale: LocaleDynamic; parent_category_uid: string }> }

const ParentCategoryPageWithLocale: NextPage<Props> = async ({ params }) => {
	const { locale, parent_category_uid: parentUID } = await params
	const parentCategory = await getCategoryByUID(parentUID, locale).catch(() => null)

	if (!parentCategory) return notFound()

	const subCategories = await getSubCategoriesByParentID(parentCategory.id, locale)

	console.log(JSON.stringify(parentCategory.data))
	const blogs = await getBlogs(locale)
	const filteredBlogs = blogs.filter(b => subCategories.some(c => c.uid === b.data.category.uid))

	if (!filteredBlogs?.length) return notFound()

	return <CategoryPageContent blogs={filteredBlogs} slug={parentUID} />
}

export default ParentCategoryPageWithLocale
