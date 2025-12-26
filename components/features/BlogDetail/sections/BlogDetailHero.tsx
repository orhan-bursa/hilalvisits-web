import { BlogPageObject } from '@/types'
import { destructureBlogProps, getRichTextWithAnnotations } from '@/utils'
import { proxyImageUrl } from '@/utils/image'
import cn from 'classnames'
import Image from 'next/image'

export default function BlogDetailHero({ data }: { data: BlogPageObject }) {
	const { title, cover, description } = destructureBlogProps(data)
	const url = proxyImageUrl(cover)

	return (
		<section className="h-max min-h-[500px] w-full space-y-3 md:max-w-[1200px]">
			<div className="relative aspect-video h-[540px] w-full min-w-[300px]">
				<Image
					src={url}
					alt={title}
					fill
					style={{ objectFit: 'cover' }}
					sizes={`
                        (max-width: 1200px) 100vw,
                        1200px
                        `}
				/>
			</div>
			<h1
				className={cn(
					'mx-auto max-w-[1050px] px-4 text-center font-semibold xl:px-0',
					'py-2 text-4xl sm:text-5xl md:text-[54px]'
				)}
			>
				{title}
			</h1>
			{/*<p className="mx-auto max-w-[900px] px-4 text-lg italic xl:px-0">{description}</p>*/}
			<p className="mx-auto max-w-[900px] px-4 text-lg italic xl:px-0">
				{description?.map(getRichTextWithAnnotations)}
			</p>
		</section>
	)
}
