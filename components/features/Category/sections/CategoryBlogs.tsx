import { BlogPageDocument } from '@/types/prismic-types'
import { Chip } from '@mui/material'
import { PrismicRichText } from '@prismicio/react'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

export default function CategoryBlogs({ blogs }: { blogs: BlogPageDocument[] }) {
	return (
		<section
			className={cn(
				'mx-auto w-full max-w-[1200px]',
				'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
			)}
		>
			{blogs?.map(blog => {
				return (
					<div className="col-span-1" key={blog?.id}>
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
							<h3 className="mb-3 cursor-pointer text-3xl font-bold hover:text-red-500">
								{blog.data.title}
							</h3>
						</Link>
						{/*FIXME: FIX BADGES*/}
						{/*<div className="mb-3 flex flex-wrap gap-2">
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
						</div>*/}
						<PrismicRichText field={blog.data.description} />
					</div>
				)
			})}
		</section>
	)
}
