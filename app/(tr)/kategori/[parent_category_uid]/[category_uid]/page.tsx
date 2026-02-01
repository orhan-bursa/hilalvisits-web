import CategoryPageContent from '@/components/features/Category/CategoryPageContent'

import { notFound } from 'next/navigation'
import { getBlogs, getCategories, getCategoryByUID } from '@/lib/prismic/services'
import { NextPage } from 'next'

type Props = { params: Promise<{ parent: string; category_uid: string }> }

const CategoryPage: NextPage<Props> = async ({ params }) => {
	const { category_uid: categoryUID } = await params

	const category = await getCategoryByUID(categoryUID, 'tr').catch(() => null)

	if (!category) return notFound()

	const blogs = await getBlogs('tr')
	const filteredBlogs = blogs.filter(b => category.uid === b.data.category.uid)

	return <CategoryPageContent blogs={filteredBlogs} slug={categoryUID} />
}

export default CategoryPage

// MAIN LOCALE CATEGORY PAGE (TR)
// Generate paths for /kategori/:parent/:category
// example => /kategori/avrupa/isvicre
export async function generateStaticParams({
	params
}: {
	params: { parent_category_uid: string }
}) {
	const { parent_category_uid } = params
	const categories = await getCategories('tr')
	const subCategories = categories.filter(c => c.data.parent_category.uid === parent_category_uid)

	return subCategories.map(c => ({
		parent_category_uid,
		category_uid: c.uid
	}))
}
