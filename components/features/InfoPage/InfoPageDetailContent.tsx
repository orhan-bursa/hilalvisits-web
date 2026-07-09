import { InfoPageDocument } from '@/types/prismic-types'
import { PrismicRichText } from '@prismicio/react'
import classNames from 'classnames'

type Props = {
	infoPage: InfoPageDocument
}

const InfoPageDetailContent: React.FC<Props> = ({ infoPage }) => {
	return (
		<div className="mx-auto h-max w-full py-20 sm:min-h-[500px] md:max-w-[1200px]">
			<h1
				className={classNames(
					'mx-auto max-w-[900px] px-4 pb-8 font-semibold xl:px-0',
					'text-4xl sm:text-5xl md:text-[54px]'
				)}
			>
				{infoPage.data.title}
			</h1>
			<div className="md-2:px-0 prose prose-lg mx-auto !mb-8 max-w-[900px] px-4 text-lg">
				<PrismicRichText field={infoPage.data.description} />
			</div>
			<div className="md-2:px-0 mx-auto max-w-[900px] break-words px-4 [&>*]:!w-full">
				<PrismicRichText field={infoPage.data.content} />
			</div>
		</div>
	)
}

export default InfoPageDetailContent
