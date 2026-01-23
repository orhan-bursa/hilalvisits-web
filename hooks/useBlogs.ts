import { getBlogsService } from '@/services'
import { useQuery } from '@tanstack/react-query'

export default function useBlogs() {
	const query = useQuery({
		queryKey: ['blogs'],
		queryFn: () => getBlogsService()
	})

	return {
		...query,
		blogs: query.data || []
	}
}
