import { BlogPageObject } from '@/types'
import { destructureBlogProps, getRichTextWithAnnotations } from '@/utils'
import { proxyImageUrl } from '@/utils/image'
import { Chip } from '@mui/material'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

export default function CategoryBlogs({ items }: { items: BlogPageObject[] }) {
	return (
		<section
			className={cn(
				'mx-auto w-full max-w-[1200px]',
				'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
			)}
		>
			{items?.map(blog => {
				const { cover, title, description, slug, categories } = destructureBlogProps(blog)
				const url = proxyImageUrl(cover)

				return (
					<div className="col-span-1" key={blog?.id}>
						<Link href={`/blog/${slug}`}>
							<div className="relative mb-3 aspect-[3/2] w-full cursor-pointer">
								<Image
									src={url ?? ''}
									alt={title}
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
							<h3 className="mb-3 cursor-pointer text-3xl font-bold hover:text-red-500">{title}</h3>
						</Link>
						<div className="mb-3 flex flex-wrap gap-2">
							{categories.map(c => (
								<Link key={c.title} href={`/${c.href}`}>
									<Chip
										label={c.title}
										variant="outlined"
										size="small"
										className="cursor-pointer rounded border-stone-400 hover:border-black hover:bg-stone-100"
									/>
								</Link>
							))}
						</div>
						<p>{description?.map(getRichTextWithAnnotations)}</p>
					</div>
				)
			})}
		</section>
	)
}
