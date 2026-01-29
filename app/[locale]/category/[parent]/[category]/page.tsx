import CategoryPageContent from '@/components/features/Category/CategoryPageContent'

import { notFound } from 'next/navigation'
import { getBlogs, getCategories, getCategoryByUID } from '@/lib/prismic/services'
import { NextPage } from 'next'
import { LocaleDynamic } from '@/types/locale'

type Props = {
	params: Promise<{
		locale: LocaleDynamic
		parent: string
		category: string
	}>
}

const CategoryPageWithLocale: NextPage<Props> = async ({ params }) => {
	const { locale, category: categoryUID } = await params

	const category = await getCategoryByUID(categoryUID, locale).catch(() => null)

	if (!category) return notFound()

	const blogs = await getBlogs(locale)
	const filteredBlogs = blogs.filter(b => category.data.title === b.data.category.data.title)

	return <CategoryPageContent blogs={filteredBlogs} slug={categoryUID} />
}

export default CategoryPageWithLocale

export async function generateStaticParams() {
	//map each locales config if more than one is added
	const categories = await getCategories('tr')
	const parents = categories.filter(c => !c?.data?.parent_category?.data)

	const entries: { locale: LocaleDynamic; parent: string; category: string }[] = []

	parents.forEach(parent => {
		const subs = categories.filter(c => c.data.parent_category.id === parent.id)
		subs?.forEach(s => {
			if (parent?.uid && s?.uid) {
				entries.push({
					locale: 'en',
					parent: parent.uid,
					category: s.uid
				})
			}
		})
	})

	console.log('entries-en', { entries })

	return entries
}
