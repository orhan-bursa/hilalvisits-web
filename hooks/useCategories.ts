import { useQuery } from '@tanstack/react-query'
import { getCategoriesService } from '@/services'

export default function useCategories() {
	const query = useQuery({
		queryKey: ['categories'],
		queryFn: () => getCategoriesService()
	})

	return {
		...query,
		categories: query.data || []
	}
}
