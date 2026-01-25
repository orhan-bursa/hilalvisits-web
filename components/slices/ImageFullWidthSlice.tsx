import { ImageFullWidthSliceType } from '@/types/prismic-types'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'

type Props = { slice: ImageFullWidthSliceType }

const ImageFullWidthSlice: React.FC<Props> = ({ slice }) => {
	const hasCaption = Array.isArray(slice.primary.caption) && slice.primary.caption.length > 0
	return (
		<section className="my-6">
			<PrismicNextImage field={slice.primary.image} />
			{hasCaption && (
				<div className="prose">
					<PrismicRichText field={slice.primary.caption} />
				</div>
			)}
		</section>
	)
}

export default ImageFullWidthSlice
