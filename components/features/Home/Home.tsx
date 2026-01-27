import { BlogPageDocument } from '@/types/prismic-types'
import { HomeFavoritesAndAboutMe, HomeHero, HomeLatestBlogs, HomePhoto } from './sections'
import { PhotoPageObject, BlogPageObject } from '@/types'
interface IPropTypes {
	blogs: BlogPageDocument[]
	photos: PhotoPageObject[] | undefined
}
export default function Home({ blogs, photos }: IPropTypes) {
	const latestFive = blogs?.slice?.(0, 5)
	const favorites = blogs?.filter(blog => blog.data.is_favorite)
	return (
		<div className="my-4 space-y-12 md:my-8 md:space-y-16">
			<HomeHero blogs={latestFive} />
			<HomeFavoritesAndAboutMe blogs={favorites} />
			<HomeLatestBlogs blogs={latestFive} />
			<HomePhoto items={photos} />
		</div>
	)
}
