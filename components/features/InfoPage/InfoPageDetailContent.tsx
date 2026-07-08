import { LocaleAll } from '@/types/locale'
import { InfoPageDocument } from '@/types/prismic-types'
import { PrismicRichText } from '@prismicio/react'
import classNames from 'classnames'

type Props = {
	infoPage: InfoPageDocument
	locale: LocaleAll
}

const InfoPageDetailContent: React.FC<Props> = ({ infoPage }) => {
	return (
		<div className="mx-auto h-max min-h-[500px] w-full py-20 md:max-w-[1200px]">
			<h1
				className={classNames(
					'mx-auto max-w-[900px] px-4 pb-8 font-semibold xl:px-0',
					'text-4xl sm:text-5xl md:text-[54px]'
				)}
			>
				{infoPage.data.title}
			</h1>
			<div className="prose prose-lg mx-auto max-w-[900px] px-4 pb-6 text-lg xl:px-0">
				<PrismicRichText field={infoPage.data.description} />
			</div>
			<div className="prose prose-lg mx-auto max-w-[900px] px-4 text-lg xl:px-0">
				<PrismicRichText field={infoPage.data.content} />
			</div>
		</div>
	)
}

export default InfoPageDetailContent
