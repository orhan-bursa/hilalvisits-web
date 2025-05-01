import { BlogPageObject } from '@/types'
import { destructureBlogProps } from '@/utils'
import { proxyImageUrl } from '@/utils/image'
import { Button, Chip } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

export default function HomeFavorites({ items }: { items?: BlogPageObject[] }) {
	return (
		<div className="w-full space-y-6 md:w-1/2">
			<h2 className="w-full cursor-default text-center text-4xl font-semibold md:text-start">
				Favoriler
			</h2>
			{items?.map(blog => {
				const { title, cover, slug, categories } = destructureBlogProps(blog)
				const url = proxyImageUrl(cover)

				return (
					<div key={blog.id} className="flex flex-row items-center gap-4 lg:gap-6">
						<div className="relative aspect-[4/3] h-[120px] sm:h-[90px]">
							<Link href={`/blog/${slug}`}>
								<Image
									src={url ?? ''}
									alt={title}
									fill
									style={{ objectFit: 'cover' }}
									sizes={`
                    (max-width: 640px) 160px,
                    120px
                    `}
								/>
							</Link>
						</div>
						<div>
							<Link href={`/blog/${slug}`}>
								<h3 className="mb-3 cursor-pointer text-2xl font-semibold hover:text-red-500 md:text-2xl">
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
						</div>
					</div>
				)
			})}
			<div className="text-center">
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
		</div>
	)
}
