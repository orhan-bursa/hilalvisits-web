import { getParentCategories } from '@/lib/prismic/services'

type Props = { children: React.ReactNode }
const ParentCategoryLayout: React.FC<Props> = ({ children }) => {
	return children
}
export default ParentCategoryLayout

// MAIN LOCALE PARENT CATEGORY LAYOUT (TR)
// Generate paths for /kategori/:parent
// example => /kategori/avrupa
export async function generateStaticParams() {
	const categories = await getParentCategories('tr')

	return categories.map(category => ({
		locale: 'tr',
		parent_category_uid: category.uid
	}))
}
