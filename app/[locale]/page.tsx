import HomePageContent from '@/components/features/Home/HomePageContent'
import { getBlogs } from '@/lib/prismic/services'
import { LocaleDynamic } from '@/types/locale'
import { NextPage } from 'next'

type Props = {
	params: Promise<{ locale: LocaleDynamic }>
}
const HomePageWithLocale: NextPage<Props> = async ({ params }) => {
	const { locale } = await params
	const blogs = await getBlogs(locale)

	return <HomePageContent photos={[]} blogs={blogs} />
}

export default HomePageWithLocale
