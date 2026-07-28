import InfoPageDetailContent from '@/components/features/InfoPage/InfoPageDetailContent'
import { getInfoPages, getInfoPageByUID } from '@/lib/prismic/services'
import { buildPrismicPageMetadata } from '@/lib/seo/metadata'
import { Metadata, NextPage } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 86400 // 60 * 60 * 24 => 1 day

type Props = {
	params: Promise<{ info_page_uid: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { info_page_uid } = await params
	const infoPage = await getInfoPageByUID(info_page_uid)

	if (!infoPage) return {}

	return buildPrismicPageMetadata({
		metaTitle: infoPage.data.meta_title,
		metaDescription: infoPage.data.meta_description,
		metaImage: infoPage.data.meta_image,
		path: `/-/${info_page_uid}`,
		fallbackTitle: infoPage.data.title
	})
}

const InfoPageDetail: NextPage<Props> = async ({ params }) => {
	const { info_page_uid } = await params

	const infoPage = await getInfoPageByUID(info_page_uid)

	if (!infoPage) return notFound()

	return <InfoPageDetailContent infoPage={infoPage} />
}

export default InfoPageDetail

export async function generateStaticParams() {
	const infoPages = await getInfoPages()

	return infoPages.map(infoPage => ({
		info_page_uid: infoPage.uid
	}))
}
