'use client'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import './styles.css'

import Image from 'next/image'
import Link from 'next/link'
import cn from 'classnames'
import { BlogPageObject } from '@/types'
import { destructureBlogProps, getRichTextWithAnnotations } from '@/utils'
import { Alert, Button, Chip } from '@mui/material'
import { proxyImageUrl } from '@/utils/image'

export default function HomeLatestBlogs({ items }: { items: BlogPageObject[] | undefined }) {
	if (!items || !items.length) return <Alert>Unable to retrieve data from server</Alert>

	return (
		<section className="mx-auto w-full max-w-[900px]">
			<h2
				className={cn(
					'mb-6 w-full cursor-default',
					'text-center text-4xl font-semibold md:text-5xl'
				)}
			>
				En Yeniler
			</h2>
			<div className="flex w-full flex-col gap-8 px-4 lg:px-0">
				{items.map(blog => {
					const { title, description, cover, slug, categories } = destructureBlogProps(blog)
					const url = proxyImageUrl(cover)

					return (
						<div key={blog.id} className="flex flex-col gap-4 sm:flex-row lg:gap-6">
							<div className="relative aspect-square h-[300px] sm:h-[200px]">
								<Link href={`/blog/${slug}`}>
									<Image
										src={url ?? ''}
										alt={title}
										fill
										style={{ objectFit: 'cover' }}
										sizes={`
                      (max-width: 640px) calc(100vw-32px),
                      200px
                      `}
									/>
								</Link>
							</div>
							<div>
								<Link href={`/blog/${slug}`}>
									<h3 className="mb-3 cursor-pointer text-3xl font-bold hover:text-red-500">
										{title}
									</h3>
								</Link>
								<div className="mb-2 flex flex-wrap gap-2">
									{categories.map(c => (
										<Link key={c.title} href={c.href}>
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
								<p className="line-clamp-5">{description?.map(getRichTextWithAnnotations)}</p>
							</div>
						</div>
					)
				})}
			</div>
			<div className="mb-2 mt-4 space-y-2 text-center">
				<Button
					variant="outlined"
					color="inherit"
					LinkComponent={Link}
					href="/blog"
					className="text-black hover:bg-transparent"
				>
					Tümünü Gör
				</Button>
			</div>
		</section>
	)
}
