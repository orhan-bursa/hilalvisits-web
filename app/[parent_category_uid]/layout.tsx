import { getParentCategories } from '@/lib/prismic/services'

type Props = { children: React.ReactNode }
const ParentCategoryLayout: React.FC<Props> = ({ children }) => {
	return children
}
export default ParentCategoryLayout

export async function generateStaticParams() {
	const categories = await getParentCategories()

	return categories.map(category => ({
		parent_category_uid: category.uid
	}))
}
