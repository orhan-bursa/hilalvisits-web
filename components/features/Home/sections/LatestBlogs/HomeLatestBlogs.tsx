import Image from 'next/image'
import Link from 'next/link'
import cn from 'classnames'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'

import { BlogPageDocument } from '@/types/prismic-types'
import { PrismicRichText } from '@prismicio/react'

type Props = {
	blogs: BlogPageDocument[]
}
export default async function HomeLatestBlogs({ blogs }: Props) {
	//TODO: handle empty state
	if (!blogs.length) return <Alert>Unable to retrieve data from server</Alert>

	return (
		<section className="mx-auto w-full max-w-[900px]">
			<h2
				className={cn(
					'mb-10 w-full cursor-default',
					'text-center text-4xl font-semibold md:text-5xl'
				)}
			>
				En Yeniler
			</h2>
			<div className="flex w-full flex-col gap-8 px-4 lg:px-0">
				{blogs.map(blog => {
					return (
						<div key={blog.id} className="flex flex-col gap-4 sm:flex-row lg:gap-6">
							<div className="relative aspect-square h-[300px] sm:h-[200px]">
								<Link href={`/blog/${blog.uid}`}>
									<Image
										src={blog.data.cover.url ?? ''}
										alt={blog.data.cover.alt || blog.data.title}
										fill
										style={{ objectFit: 'cover' }}
										sizes={`
                      (max-width: 640px) calc(100vw-32px),
                      400px
                      `}
									/>
								</Link>
							</div>
							<div>
								<Link href={`/blog/${blog.uid}`}>
									<h3 className="mb-3 cursor-pointer text-3xl font-bold hover:text-red-500">
										{blog.data.title}
									</h3>
								</Link>
								{/*TODO: fix category badges*/}
								<div className="mb-2 flex flex-wrap gap-2">
									{blog.data.category.data.parent_category && (
										<Link href={`/${blog.data.category.data.parent_category?.uid}`}>
											<Chip
												label={blog.data.category.data.parent_category?.data.title}
												variant="outlined"
												size="small"
												className="cursor-pointer rounded border-stone-400 hover:border-black hover:bg-stone-100"
											/>
										</Link>
									)}
									{blog.data.category && (
										<Link
											href={`/${blog.data.category.data.parent_category?.uid}/${blog.data.category?.uid}`}
										>
											<Chip
												label={blog.data.category?.data.title}
												variant="outlined"
												size="small"
												className="cursor-pointer rounded border-stone-400 hover:border-black hover:bg-stone-100"
											/>
										</Link>
									)}
								</div>
								{/*<div className="mb-2 flex flex-wrap gap-2">
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
								</div>*/}
								<div className="text prose prose-lg line-clamp-5 leading-[30px]">
									<PrismicRichText
										field={blog.data.description}
										components={{
											paragraph: ({ children }) => <>{children}</>
										}}
									/>
								</div>
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
					Tümünü gör
				</Button>
			</div>
		</section>
	)
}
