import { RichTextSliceType } from '@/types/prismic-types'
import { PrismicRichText } from '@prismicio/react'

type Props = { slice: RichTextSliceType }

const RichTextSlice: React.FC<Props> = ({ slice }) => {
	return (
		<section className="prose prose-lg w-[900px]">
			<PrismicRichText field={slice.primary.content} />
		</section>
	)
}

export default RichTextSlice
