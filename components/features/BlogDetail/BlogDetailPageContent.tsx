import { BlogPageDocument } from '@/types/prismic-types'
import { PrismicNextImage } from '@prismicio/next'
import cn from 'classnames'
import { PrismicRichText, SliceZone } from '@prismicio/react'
import RichTextSlice from '@/components/slices/RichTextSlice'
import ImageFullWidthSlice from '@/components/slices/ImageFullWidthSlice'
import ImageSideBySideSlice from '@/components/slices/ImageSideBySideSlice'

interface IPropTypes {
	blog: BlogPageDocument
}

export default function BlogDetailPageContent({ blog }: IPropTypes) {
	return (
		<div>
			<div className="mx-auto h-max min-h-[500px] w-full space-y-3 md:max-w-[1200px]">
				<PrismicNextImage field={blog.data.cover} />

				<h1
					className={cn(
						'mx-auto max-w-[1050px] px-4 text-center font-semibold xl:px-0',
						'py-2 text-4xl sm:text-5xl md:text-[54px]'
					)}
				>
					{blog.data.title}
				</h1>
				<div className="prose prose-lg mx-auto max-w-[900px] px-4 text-lg xl:px-0">
					<PrismicRichText field={blog.data.description} />
				</div>
			</div>
			<article className="mx-auto max-w-[900px]">
				<SliceZone
					slices={blog.data.slices}
					components={{
						rich_text: RichTextSlice,
						image_full_width: ImageFullWidthSlice,
						image_side_by_side: ImageSideBySideSlice
					}}
				/>
			</article>
		</div>
	)
}
