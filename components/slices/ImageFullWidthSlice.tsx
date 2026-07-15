import { ImageFullWidthSliceType } from '@/types/prismic-types'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'

type Props = { slice: ImageFullWidthSliceType }

const ImageFullWidthSlice: React.FC<Props> = ({ slice }) => {
	const hasCaption = Array.isArray(slice.primary.caption) && slice.primary.caption.length > 0
	return (
		<section className="my-6 flex flex-col items-center gap-2">
			<div>
				<PrismicNextImage field={slice.primary.image} />
				{hasCaption && (
					<div className="prose mt-2 max-w-none">
						<PrismicRichText field={slice.primary.caption} />
					</div>
				)}
			</div>
		</section>
	)
}

export default ImageFullWidthSlice
