import HomeAboutMe from './HomeAboutMe'
import { BlogPageDocument } from '@/types/prismic-types'

export default function HomeFavoritesAndAboutMe({ blogs }: { blogs?: BlogPageDocument[] }) {
	return (
		<section className="mx-auto flex max-w-[900px] flex-col gap-6 px-4 md:flex-row xl:px-0">
			<div>
				{/* <HomeFavorites items={items} /> */}
				<HomeAboutMe />
			</div>
		</section>
	)
}
