import { ImageSideBySideSliceType } from '@/types/prismic-types'
import { PrismicNextImage } from '@prismicio/next'

type Props = { slice: ImageSideBySideSliceType }

const ImageSideBySideSlice: React.FC<Props> = ({ slice }) => {
	return (
		<section className="my-6 flex flex-col gap-6 md:flex-row">
			<PrismicNextImage className="md:max-w-[calc(50%-12px)]" field={slice.primary.image_left} />
			<PrismicNextImage className="md:max-w-[calc(50%-12px)]" field={slice.primary.image_right} />
		</section>
	)
}

export default ImageSideBySideSlice
