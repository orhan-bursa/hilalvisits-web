import { RichTextSliceType } from '@/types/prismic-types'
import { PrismicRichText, RichTextComponents } from '@prismicio/react'

type Props = { slice: RichTextSliceType }

const RichTextSlice: React.FC<Props> = ({ slice }) => {
	return (
		<section className="prose prose-lg max-w-[900px]">
			<PrismicRichText
				field={slice.primary.content}
				components={{
					label: ({ node, children }) => {
						if (node.data.label === 'underline') {
							return <span className="underline">{children}</span>
						}
						return <span>{children}</span>
					}
				}}
			/>
		</section>
	)
}

export default RichTextSlice
