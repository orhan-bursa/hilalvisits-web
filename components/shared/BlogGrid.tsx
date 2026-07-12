import { BlogPageDocument } from '@/types/prismic-types'
import BlogGridCard from './BlogGridCard'
import cn from 'classnames'
import BlogEmptyState from './BlogEmptyState'

type Props = {
	blogs: BlogPageDocument[]
}

const BlogGrid: React.FC<Props> = ({ blogs }) => {
	if (blogs.length === 0) {
		return <BlogEmptyState />
	}

	return (
		<section
			className={cn(
				'mx-auto w-full max-w-[1200px]',
				'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
			)}
		>
			{blogs?.map((blog, key) => <BlogGridCard blog={blog} key={key} />)}
		</section>
	)
}

export default BlogGrid
