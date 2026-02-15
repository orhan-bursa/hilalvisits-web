import { BlogPageDocument } from '@/types/prismic-types'
import HomeHero from './sections/Hero/HomeHero'
import HomeLatestBlogs from './sections/LatestBlogs/HomeLatestBlogs'
import { getLocale, getTranslations } from 'next-intl/server'
import HomeAboutMe from './sections/AboutMe'

interface Props {
	blogs: BlogPageDocument[]
	photos: any[] | undefined
}
export default async function HomePageContent({ blogs, photos }: Props) {
	const locale = await getLocale()
	const t = await getTranslations('HomePage')
	const latestFive = blogs?.slice?.(0, 5)

	return (
		<div className="my-4 space-y-12 md:my-8 md:space-y-16">
			<HomeHero blogs={latestFive} readMoreText={t('read_more')} locale={locale} />
			<HomeAboutMe />
			<HomeLatestBlogs blogs={latestFive} />
			{/*<HomePhoto items={photos} />*/}
		</div>
	)
}
