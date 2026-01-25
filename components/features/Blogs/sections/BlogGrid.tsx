import { BlogPageDocument, MenuItemType } from '@/types/prismic-types'

import { Chip } from '@mui/material'
import { PrismicRichText } from '@prismicio/react'
import Image from 'next/image'
import Link from 'next/link'

export default function BlogGrid({
	blogs,
	menuItems
}: {
	blogs: BlogPageDocument[]
	menuItems: MenuItemType[]
}) {
	return (
		<section className="mx-auto w-full max-w-[1200px]">
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{blogs?.map((blog, key) => {
					return (
						<div className="col-span-1" key={key}>
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
							<div className="prose prose-lg px-2 min-[1200px]:px-0">
								<PrismicRichText field={blog.data.description} />
							</div>
						</div>
					)
				})}
			</div>
		</section>
	)
}
