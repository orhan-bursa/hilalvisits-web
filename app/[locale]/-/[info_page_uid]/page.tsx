import InfoPageDetailContent from '@/components/features/InfoPage/InfoPageDetailContent'
import { getInfoPages, getInfoPageByUID } from '@/lib/prismic/services'
import { LocaleAll, LocaleDynamic } from '@/types/locale'
import { NextPage } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 86400 // 60 * 60 * 24 => 1 day

type Props = {
	params: Promise<{ locale: LocaleDynamic; info_page_uid: string }>
}

const InfoPageDetailWithLocale: NextPage<Props> = async ({ params }) => {
	const { locale, info_page_uid } = await params

	const infoPage = await getInfoPageByUID(info_page_uid, locale)

	if (!infoPage) return notFound()

	return <InfoPageDetailContent infoPage={infoPage} locale={locale} />
}

export default InfoPageDetailWithLocale

export async function generateStaticParams() {
	const infoPages = await getInfoPages('en')

	return infoPages.map(infoPage => ({
		info_page_uid: infoPage.uid
	}))
}
