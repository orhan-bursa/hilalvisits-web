import Link from 'next/link'
import { whisper } from '@/utils/fonts'
import cn from 'classnames'
import { Tooltip } from '@mui/material'
import { shortenText } from '@/utils/text'
import InstagramIcon from '@mui/icons-material/Instagram'
import CustomButtonHoverInvert from '@/components/ui/CustomButtonHoverInvert'

type MappedInstagramPost = {
	id: string
	title: string
	url: string
	src: string
}
export default async function Instagram() {
	const mapPosts: (response: any) => MappedInstagramPost[] = (response: any) => {
		const mappedItems = response?.media?.data?.map((post: any) => {
			return {
				id: post.id,
				title: post.caption,
				url: post.permalink,
				src: post.thumbnail_url || post.media_url
			}
		})
		return mappedItems
	}

	const fetchInstagramData = async () => {
		const instaID = process.env.INSTAGRAM_ID
		const instaToken = process.env.INSTAGRAM_TOKEN
		const instaFields =
			'profile_picture_url,name,username,biography,media.limit(6){caption,media_url,permalink,thumbnail_url,timestamp,comments_count,like_count,media_type,children{media_url}}'
		const url = `https://graph.facebook.com/v16.0/${instaID}?fields=${instaFields}&access_token=${instaToken}`
		const res = await fetch(url, {
			cache: 'no-store'
		})

		return await res.json()
	}
	const data = await fetchInstagramData()
	const posts = mapPosts(data)

	return (
		<div
			className={cn(
				'flex h-max w-full flex-col items-center bg-amber-50 p-4',
				'border-t-[1px] border-amber-400 border-opacity-60'
			)}
		>
			<div className="h-full w-full max-w-[1200px]">
				<div className="flex w-full items-center justify-center">
					<h1
						className={cn(
							whisper.className,
							'z-30 mb-1 cursor-default text-center text-amber-400',
							'text-6xl sm:text-[80px]'
						)}
					>
						Instagram
					</h1>
				</div>
				<div
					className={cn(
						'my-4 w-full border-2 border-amber-400 p-2',
						'grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6'
					)}
				>
					{posts?.map(post => {
						const titleWithoutHashtags = post?.title?.split('#')[0]
						const _postTitle = shortenText(titleWithoutHashtags, 100, 15)
						return (
							<Tooltip key={post.id} title={_postTitle}>
								<Link href={post.url} target="blank" style={{ height: '100%' }}>
									{post.src && (
										<img src={post.src} alt={post.title} className="h-full object-cover" />
									)}
								</Link>
							</Tooltip>
						)
					})}
				</div>
				<div className="flex justify-center">
					<CustomButtonHoverInvert
						LinkComponent={Link}
						href={'https://www.instagram.com/hilalvisits/'}
						target="_blank"
						startIcon={<InstagramIcon />}
					>
						Takip Et
					</CustomButtonHoverInvert>
				</div>
			</div>
		</div>
	)
}
