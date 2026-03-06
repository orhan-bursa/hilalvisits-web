import { BlogPageDocument } from '@/types/prismic-types'
import HomeHero from './sections/Hero/HomeHero'
import HomeLatestBlogs from './sections/LatestBlogs/HomeLatestBlogs'
import { getTranslations } from 'next-intl/server'
import HomeAboutMe from './sections/AboutMe'
import { LocaleAll } from '@/types/locale'

interface Props {
	blogs: BlogPageDocument[]
	photos: any[] | undefined
	locale: LocaleAll
}
export default async function HomePageContent({ blogs, photos, locale }: Props) {
	const t = await getTranslations({ namespace: 'HomePage', locale })
	const latestFive = blogs?.slice?.(0, 5)

	return (
		<div className="my-4 space-y-12 md:my-8 md:space-y-16">
			<HomeHero blogs={latestFive} readMoreText={t('read_more')} locale={locale} />
			<HomeAboutMe locale={locale} />
			<HomeLatestBlogs blogs={latestFive} locale={locale} />
			{/*<HomePhoto items={photos} />*/}
		</div>
	)
}
