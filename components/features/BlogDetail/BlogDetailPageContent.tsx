import { BlogPageDocument } from '@/types/prismic-types'
import { PrismicNextImage } from '@prismicio/next'
import cn from 'classnames'
import { PrismicRichText, SliceZone } from '@prismicio/react'
import RichTextSlice from '@/components/slices/RichTextSlice'
import ImageFullWidthSlice from '@/components/slices/ImageFullWidthSlice'
import ImageSideBySideSlice from '@/components/slices/ImageSideBySideSlice'

type Props = {
	blog: BlogPageDocument
}

export default function BlogDetailPageContent({ blog }: Props) {
	const hasCoverCaption =
		Array.isArray(blog.data.cover_caption) && blog.data.cover_caption.length > 0
	return (
		<div className="pb-8">
			<div className="mx-auto h-max w-full space-y-3 sm:min-h-[500px] md:max-w-[1200px]">
				<div>
					<PrismicNextImage field={blog.data.cover} className="mx-auto" />
					{hasCoverCaption && (
						<div className="prose max-w-none px-2 md:col-start-1 md:row-start-2 xl:px-0">
							<PrismicRichText field={blog.data.cover_caption} />
						</div>
					)}
				</div>

				<h1
					className={cn(
						'mx-auto max-w-[1050px] px-4 text-center font-semibold xl:px-0',
						'py-2 text-4xl sm:text-5xl md:text-[54px]'
					)}
				>
					{blog.data.title}
				</h1>
				<div className="md-2:px-0 prose prose-lg mx-auto !mb-8 max-w-[900px] px-4 text-lg">
					<PrismicRichText field={blog.data.description} />
				</div>
			</div>
			<article className="md-2:px-0 mx-auto max-w-[900px] break-words px-4 [&>*]:!w-full">
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
