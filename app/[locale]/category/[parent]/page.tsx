import { notFound } from 'next/navigation'
import CategoryPageContent from '@/components/features/Category/CategoryPageContent'
import { NextPage } from 'next'
import {
	getBlogs,
	getCategoryByUID,
	getParentCategories,
	getSubCategoriesByParentID
} from '@/lib/prismic/services'
import { LocaleDynamic } from '@/types/locale'

type Props = { params: Promise<{ locale: LocaleDynamic; parent: string }> }

const ParentCategoryPageWithLocale: NextPage<Props> = async ({ params }) => {
	const { locale, parent: parentUID } = await params
	const parentCategory = await getCategoryByUID(parentUID, locale).catch(() => null)

	if (!parentCategory) return notFound()

	const subCategories = await getSubCategoriesByParentID(parentCategory.id, 'tr')

	const blogs = await getBlogs(locale)
	const filteredBlogs = blogs.filter(b =>
		subCategories.some(c => c.data.title === b.data.category.data.title)
	)

	if (!filteredBlogs?.length) return notFound()

	return <CategoryPageContent blogs={filteredBlogs} slug={parentUID} />
}

export default ParentCategoryPageWithLocale

export async function generateStaticParams() {
	//map each locales config if more than one is added
	const categories = await getParentCategories('en')

	console.log('ALSDKFAWL====================en', { categories })
	console.log('parents', categories.map(c => c.data.title).join())

	return categories.map(category => ({
		uid: category.uid,
		locale: 'en'
	}))
}
