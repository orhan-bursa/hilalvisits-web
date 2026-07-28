import CategoryPageContent from '@/components/features/Category/CategoryPageContent'
import { getBlogs, getCategories, getCategoryByUID } from '@/lib/prismic/services'
import { buildPrismicPageMetadata } from '@/lib/seo/metadata'
import { Metadata, NextPage } from 'next'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ parent_category_uid: string; category_uid: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { parent_category_uid, category_uid } = await params
	const category = await getCategoryByUID(category_uid).catch(() => null)

	if (!category) return {}

	return buildPrismicPageMetadata({
		metaTitle: category.data.meta_title,
		metaDescription: category.data.meta_description,
		metaImage: category.data.meta_image,
		path: `/${parent_category_uid}/${category_uid}`,
		fallbackTitle: category.data.title
	})
}

const CategoryPage: NextPage<Props> = async ({ params }) => {
	const { category_uid: categoryUID } = await params

	const category = await getCategoryByUID(categoryUID).catch(() => null)

	if (!category) return notFound()

	const blogs = await getBlogs()
	const filteredBlogs = blogs.filter(b => category.uid === b.data.category.uid)

	return <CategoryPageContent blogs={filteredBlogs} category={category} />
}

export default CategoryPage

export async function generateStaticParams({
	params
}: {
	params: { parent_category_uid: string }
}) {
	const { parent_category_uid } = params
	const categories = await getCategories()
	const subCategories = categories.filter(c => c.data.parent_category.uid === parent_category_uid)

	return subCategories.map(c => ({
		parent_category_uid,
		category_uid: c.uid
	}))
}
