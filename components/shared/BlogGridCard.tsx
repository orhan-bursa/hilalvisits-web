import { BlogPageDocument } from '@/types/prismic-types'
import Link from 'next/link'
import Image from 'next/image'
import { PrismicRichText } from '@prismicio/react'

type Props = {
	blog: BlogPageDocument
}

const BlogGridCard: React.FC<Props> = ({ blog }) => {
	const desc = blog.data.description?.map((item: any) => ({
		...item,
		text: item.text.replace(' \n\n', '')
	}))
	return (
		<div className="col-span-1">
			<Link href={`/blog/${blog.uid}`}>
				<div className="relative mb-3 aspect-[3/2] w-full cursor-pointer">
					<Image
						src={blog.data.cover.url ?? ''}
						alt={blog.data.cover.alt || ''}
						fill
						style={{ objectFit: 'cover' }}
						sizes={`
                      (max-width: 640px) 100vw,
                      (max-width: 1024px) calc((100vw-24px)/2),
                      (max-width: 1200px) calc((100vw-48px)/3),
                      calc((1200px-48px)/3)
                      `}
					/>
				</div>
				<h3 className="mb-3 cursor-pointer px-2 text-3xl font-bold hover:text-red-500 min-[1200px]:px-0">
					{blog.data.title}
				</h3>
			</Link>
			{/*FIXME FIX CATEGORY BADGE*/}
			{/*<div className="mb-3 flex flex-wrap gap-2 px-2 min-[1200px]:px-0">
				{[blog.data.category.data].map(c => (
					<Link key={c.title} href={`/`}>
						<Chip
							key={c.title}
							label={c.title}
							variant="outlined"
							size="small"
							className="cursor-pointer rounded border-stone-400 hover:border-black hover:bg-stone-100"
						/>
					</Link>
				))}
			</div>*/}
			<div className="prose prose-lg line-clamp-5 px-4 min-[1200px]:px-0">
				<PrismicRichText field={blog.data.description} />
			</div>
		</div>
	)
}

export default BlogGridCard
