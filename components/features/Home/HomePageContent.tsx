import { BlogPageDocument } from '@/types/prismic-types'
import HomeHero from './sections/Hero/HomeHero'
import HomeFavoritesAndAboutMe from './sections/FavoritesAndAboutMe/HomeFavoritesAndAboutMe'
import HomeLatestBlogs from './sections/LatestBlogs/HomeLatestBlogs'
// import HomePhoto from './sections/Photo/HomePhoto'

interface Props {
	blogs: BlogPageDocument[]
	photos: any[] | undefined
}
export default function HomePageContent({ blogs, photos }: Props) {
	const latestFive = blogs?.slice?.(0, 5)
	const favorites = blogs?.filter(blog => blog.data.is_favorite)
	return (
		<div className="my-4 space-y-12 md:my-8 md:space-y-16">
			<HomeHero blogs={latestFive} />
			<HomeFavoritesAndAboutMe blogs={favorites} />
			<HomeLatestBlogs blogs={latestFive} />
			{/*<HomePhoto items={photos} />*/}
		</div>
	)
}
