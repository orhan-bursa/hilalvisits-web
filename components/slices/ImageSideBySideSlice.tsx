import { ImageSideBySideSliceType } from '@/types/prismic-types'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'

type Props = { slice: ImageSideBySideSliceType }

const ImageSideBySideSlice: React.FC<Props> = ({ slice }) => {
	const hasCaptionLeft =
		Array.isArray(slice.primary.caption_left) && slice.primary.caption_left.length > 0
	const hasCaptionRight =
		Array.isArray(slice.primary.caption_right) && slice.primary.caption_right.length > 0

	return (
		<section className="my-6 grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2 md:grid-rows-[1fr_auto]">
			<div className="md:col-start-1 md:row-start-1">
				<PrismicNextImage className="h-full w-full object-cover" field={slice.primary.image_left} />
			</div>
			{hasCaptionLeft && (
				<div className="prose max-w-none md:col-start-1 md:row-start-2">
					<PrismicRichText field={slice.primary.caption_left} />
				</div>
			)}

			<div className="md:col-start-2 md:row-start-1">
				<PrismicNextImage
					className="h-full w-full object-cover"
					field={slice.primary.image_right}
				/>
			</div>
			{hasCaptionRight && (
				<div className="prose max-w-none md:col-start-2 md:row-start-2">
					<PrismicRichText field={slice.primary.caption_right} />
				</div>
			)}
		</section>
	)
}

export default ImageSideBySideSlice
