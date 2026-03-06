import InfoPageDetailContent from '@/components/features/InfoPage/InfoPageDetailContent'
import { getInfoPages, getInfoPageByUID } from '@/lib/prismic/services'
import { NextPage } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 86400 // 60 * 60 * 24 => 1 day

type Props = {
	params: Promise<{ info_page_uid: string }>
}

const InfoPageDetail: NextPage<Props> = async ({ params }) => {
	const { info_page_uid } = await params

	const infoPage = await getInfoPageByUID(info_page_uid, 'tr')

	if (!infoPage) return notFound()

	return <InfoPageDetailContent infoPage={infoPage} locale="tr" />
}

export default InfoPageDetail

export async function generateStaticParams() {
	const infoPages = await getInfoPages('tr')

	return infoPages.map(infoPage => ({
		info_page_uid: infoPage.uid
	}))
}
