import CategoryPageContent from '@/components/features/Category/CategoryPageContent'
import { getBlogs, getCategories, getCategoryByUID } from '@/lib/prismic/services'
import { breadcrumbSchema, JsonLd } from '@/lib/seo/jsonld'
import { buildPrismicPageMetadata } from '@/lib/seo/metadata'
import { Metadata, NextPage } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'

export const revalidate = 86400 // 60 * 60 * 24 => 1 day

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
	const { parent_category_uid: parentUID, category_uid: categoryUID } = await params

	const category = await getCategoryByUID(categoryUID).catch(() => null)

	if (!category) return notFound()

	// Only one URL per category: /<real parent>/<category>. Anything else would be duplicate content.
	const realParentUID = category.data.parent_category?.uid
	if (!realParentUID) permanentRedirect(`/${category.uid}`) // top-level category requested as a child
	if (realParentUID !== parentUID) permanentRedirect(`/${realParentUID}/${category.uid}`)

	const blogs = await getBlogs()
	const filteredBlogs = blogs.filter(b => category.uid === b.data.category.uid)

	return (
		<>
			<JsonLd
				data={breadcrumbSchema([
					{ name: 'Ana Sayfa', path: '/' },
					{ name: 'Bloglar', path: '/blog' },
					{
						name: category.data.parent_category?.data?.title || realParentUID,
						path: `/${realParentUID}`
					},
					{ name: category.data.title, path: `/${realParentUID}/${category.uid}` }
				])}
			/>
			<CategoryPageContent blogs={filteredBlogs} category={category} />
		</>
	)
}

export default CategoryPage

export async function generateStaticParams({
	params
}: {
	params: { parent_category_uid: string } | Promise<{ parent_category_uid: string }>
}) {
	const { parent_category_uid } = await params
	const categories = await getCategories()
	const subCategories = categories.filter(c => c.data.parent_category?.uid === parent_category_uid)

	return subCategories.map(c => ({
		parent_category_uid,
		category_uid: c.uid
	}))
}
