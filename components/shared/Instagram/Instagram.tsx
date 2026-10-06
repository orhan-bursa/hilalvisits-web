'use client'

import type { InstagramPost } from '@/app/api/instagram/route'
import CustomButtonHoverInvert from '@/components/ui/CustomButtonHoverInvert'
import { shortenText } from '@/utils/text'
import InstagramIcon from '@mui/icons-material/Instagram'
import Tooltip from '@mui/material/Tooltip'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const INSTAGRAM_URL = 'https://www.instagram.com/hilalvisits/'
const SKELETON_COUNT = 6

/**
 * Instagram feed, loaded in the browser from `/api/instagram`.
 *
 * Loaded client-side on purpose: Instagram image URLs expire, so keeping them out of the
 * server-rendered HTML lets every page be statically cached (ISR) without breaking images.
 */
export default function Instagram() {
	const [posts, setPosts] = useState<InstagramPost[] | null>(null)

	useEffect(() => {
		const controller = new AbortController()

		fetch('/api/instagram', { signal: controller.signal })
			.then(res => (res.ok ? res.json() : { posts: [] }))
			.then((data: { posts: InstagramPost[] }) => setPosts(data.posts ?? []))
			.catch(err => {
				if (err?.name !== 'AbortError') setPosts([])
			})

		return () => controller.abort()
	}, [])

	const isLoading = posts === null
	const hasPosts = !!posts?.length

	return (
		<div
			className={cn(
				'flex h-max w-full flex-col items-center bg-amber-50 p-4',
				'border-t-[1px] border-amber-400 border-opacity-60'
			)}
		>
			<div className="h-full w-full max-w-[1200px]">
				<Link
					href={INSTAGRAM_URL}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Instagram'da Hilal Visits"
					className="relative mx-auto flex w-max max-w-[300px] items-center justify-center text-[#222]"
				>
					<InstagramIcon sx={{ width: 50, height: 50 }} color="inherit" />
					<Image
						width={213.6}
						height={80}
						src="/images/instagram/instagram-text.png"
						alt="Instagram"
					/>
				</Link>

				{(isLoading || hasPosts) && (
					<div
						className={cn(
							'my-4 w-full border-2 border-amber-400 p-2',
							'grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6'
						)}
					>
						{isLoading
							? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
									<div key={i} className="aspect-square w-full animate-pulse bg-amber-100" />
								))
							: posts!.map(post => {
									const captionWithoutHashtags = post.caption.split('#')[0].trim()
									const shortCaption = shortenText(captionWithoutHashtags, 100, 15)

									return (
										<Tooltip key={post.id} title={shortCaption}>
											<Link
												href={post.url}
												target="_blank"
												rel="noopener noreferrer"
												className="block aspect-square w-full overflow-hidden"
											>
												{/* eslint-disable-next-line @next/next/no-img-element */}
												<img
													src={post.src}
													alt={shortCaption || 'Hilal Visits Instagram gönderisi'}
													loading="lazy"
													decoding="async"
													className="h-full w-full object-cover"
												/>
											</Link>
										</Tooltip>
									)
								})}
					</div>
				)}

				<div className={cn('flex justify-center', !isLoading && !hasPosts && 'mt-4')}>
					<CustomButtonHoverInvert
						LinkComponent={Link}
						href={INSTAGRAM_URL}
						target="_blank"
						rel="noopener noreferrer"
						startIcon={<InstagramIcon />}
					>
						Takip et
					</CustomButtonHoverInvert>
				</div>
			</div>
		</div>
	)
}
