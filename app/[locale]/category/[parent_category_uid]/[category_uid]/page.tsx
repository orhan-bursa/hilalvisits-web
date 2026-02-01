import CategoryPageContent from '@/components/features/Category/CategoryPageContent'

import { notFound } from 'next/navigation'
import { getBlogs, getCategories, getCategoryByUID } from '@/lib/prismic/services'
import { NextPage } from 'next'
import { LocaleDynamic } from '@/types/locale'

type Props = {
	params: Promise<{
		locale: LocaleDynamic
		parent: string
		category_uid: string
	}>
}

const CategoryPageWithLocale: NextPage<Props> = async ({ params }) => {
	const { locale, category_uid: categoryUID } = await params

	const category = await getCategoryByUID(categoryUID, locale).catch(() => null)

	if (!category) return notFound()

	const blogs = await getBlogs(locale)
	const filteredBlogs = blogs.filter(b => category.uid === b.data.category.uid)

	return <CategoryPageContent blogs={filteredBlogs} slug={categoryUID} />
}

export default CategoryPageWithLocale

// DYNAMIC LOCALE CATEGORY PAGE (EN)
// Generate paths for /en/category/:parent/:category
// example => /en/category/europe/switzerland
export async function generateStaticParams({
	params
}: {
	params: { locale: LocaleDynamic; parent_category_uid: string }
}) {
	const { locale, parent_category_uid } = params
	const categories = await getCategories(locale)
	const subCategories = categories.filter(c => c.data.parent_category.uid === parent_category_uid)

	return subCategories.map(c => ({
		locale,
		parent_category_uid,
		category_uid: c.uid
	}))
}
