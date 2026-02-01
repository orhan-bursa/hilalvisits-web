import { getParentCategories } from '@/lib/prismic/services'
import { LocaleDynamic } from '@/types/locale'

type Props = { children: React.ReactNode }
const ParentCategoryLayoutWithLocale: React.FC<Props> = ({ children }) => {
	return children
}
export default ParentCategoryLayoutWithLocale

// DYNAMIC LOCALE PARENT CATEGORY LAYOUT (EN)
// Generate paths for /en/category/:parent
// example => /en/category/europe
export async function generateStaticParams({ params }: { params: { locale: LocaleDynamic } }) {
	const { locale } = params
	const categories = await getParentCategories(locale)

	return categories.map(category => ({
		locale: locale,
		parent_category_uid: category.uid
	}))
}
