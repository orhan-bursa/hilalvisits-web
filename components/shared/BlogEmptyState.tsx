import Link from 'next/link'
import Button from '@mui/material/Button'
import ArticleIcon from '@mui/icons-material/Article'
import cn from 'classnames'

const BlogEmptyState: React.FC = () => {
	return (
		<div
			className={cn(
				'mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center',
				'gap-4 rounded-2xl px-6 pb-20 pt-10 text-center'
			)}
		>
			<ArticleIcon className="!text-6xl text-gray-800" />

			<p className="text-2xl font-semibold text-gray-800">Bu kategoride henüz blog yok</p>

			<p className="max-w-md text-base leading-relaxed text-gray-500">
				Yakında yeni gezi hikayeleri ve rehberlerle burada olacağız. O zamana kadar diğer
				yazılarımıza göz atabilirsin.
			</p>

			<Button variant="outlined" color="inherit" LinkComponent={Link} href="/blog">
				Tüm Blogları Gör
			</Button>
		</div>
	)
}

export default BlogEmptyState
