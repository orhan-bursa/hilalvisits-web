import { BlogPageDocument, CategoryPageDocument } from '@/types/prismic-types'
import { Breadcrumbs, Chip } from '@mui/material'
import Link from 'next/link'
import cn from 'classnames'
import Image from 'next/image'
import { PrismicRichText } from '@prismicio/react'

type Props = {
	blogs: BlogPageDocument[]
	category: CategoryPageDocument
	subCategories?: CategoryPageDocument[]
}
export default async function CategoryPageContent({ blogs, category, subCategories }: Props) {
	return (
		<div className="my-8 space-y-6 md:space-y-12">
			{/* HEADER */}
			<section className="mx-auto max-w-[1200px] space-y-3">
				<h2 className={cn('cursor-default px-4', 'text-center text-4xl font-semibold')}>
					{category.data.title} Blogları
				</h2>
				<div className="flex justify-center uppercase">
					<Breadcrumbs>
						<Link color="inherit" href="/" className="hover:text-red-500 hover:underline">
							Ana Sayfa
						</Link>
						{!!category.data.parent_category?.uid ? (
							<>
								<Link
									color="inherit"
									href={`/${category.data.parent_category?.uid}`}
									className="hover:text-red-500 hover:underline"
								>
									{category.data.parent_category?.data?.title}
								</Link>
								<p className="cursor-default font-bold">{category.data.title}</p>
							</>
						) : (
							<Link
								color="inherit"
								href={`/${category.uid}`}
								className="hover:text-red-500 hover:underline"
							>
								{category.data.title}
							</Link>
						)}
					</Breadcrumbs>
				</div>
				{!!subCategories && subCategories.length > 0 && (
					<div className="mb-3 flex flex-wrap justify-center gap-2">
						{subCategories.map((c, i) => (
							<Link key={i} href={`/${c.data.parent_category.uid}/${c.uid}`}>
								<Chip
									label={c.data.title}
									className="cursor-pointer rounded bg-gray-500 text-white hover:bg-gray-600"
								/>
							</Link>
						))}
					</div>
				)}
			</section>
			{/* BLOGS */}
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
		</div>
	)
}
