import { BlogPageDocument } from '@/types/prismic-types'
import HomeHero from './sections/Hero/HomeHero'
import HomeLatestBlogs from './sections/LatestBlogs/HomeLatestBlogs'
import HomeAboutMe from './sections/AboutMe'

interface Props {
	blogs: BlogPageDocument[]
	photos: any[] | undefined
}
export default async function HomePageContent({ blogs, photos }: Props) {
	const latestFive = blogs?.slice?.(0, 5)

	return (
		<div className="my-4 space-y-12 md:my-8 md:space-y-16">
			<HomeHero blogs={latestFive} />
			<HomeAboutMe />
			<HomeLatestBlogs blogs={latestFive} />
			{/*<HomePhoto items={photos} />*/}
		</div>
	)
}
