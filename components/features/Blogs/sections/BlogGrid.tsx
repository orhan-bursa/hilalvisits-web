import { BlogPageObject } from '@/types'
import { destructureBlogProps } from '@/utils'
import { proxyImageUrl } from '@/utils/image'
import { Chip } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

export default function BlogGrid({ items }: { items: BlogPageObject[] }) {
	return (
		<section className="mx-auto w-full max-w-[1200px]">
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
								<h3 className="mb-3 cursor-pointer px-2 text-3xl font-bold hover:text-red-500 min-[1200px]:px-0">
									{title}
								</h3>
							</Link>
							<div className="mb-3 flex flex-wrap gap-2 px-2 min-[1200px]:px-0">
								{categories.map(c => (
									<Link key={c.title} href={`/${c.href}`}>
										<Chip
											key={c.title}
											label={c.title}
											variant="outlined"
											size="small"
											className="cursor-pointer rounded border-stone-400 hover:border-black hover:bg-stone-100"
										/>
									</Link>
								))}
							</div>
							<p className="px-2 min-[1200px]:px-0">{description}</p>
						</div>
					)
				})}
			</div>
		</section>
	)
}
