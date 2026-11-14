import HomePageContent from '@/components/features/Home/HomePageContent'
import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/site'
import { getBlogs } from '@/lib/prismic/services'
import { JsonLd, personSchema, websiteSchema } from '@/lib/seo/jsonld'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { Metadata, NextPage } from 'next'

export const revalidate = 86400 // 60 * 60 * 24 => 1 day

export const metadata: Metadata = buildPageMetadata({
	title: `${SITE_NAME} | Hilalin Seyahat Rehberi`,
	description: SITE_DESCRIPTION,
	path: '/',
	titleAbsolute: true
})

const HomePage: NextPage = async () => {
	const blogs = await getBlogs()

	return (
		<>
			<JsonLd data={[websiteSchema(), personSchema()]} />
			<HomePageContent photos={[]} blogs={blogs} />
		</>
	)
}

export default HomePage
