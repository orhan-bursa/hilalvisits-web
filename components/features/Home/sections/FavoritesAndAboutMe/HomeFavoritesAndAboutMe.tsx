import React from 'react'
import HomeFavorites from './HomeFavorites'
import HomeAboutMe from './HomeAboutMe'
import { BlogPageObject } from '@/types'

export default function HomeFavoritesAndAboutMe({ items }: { items?: BlogPageObject[] }) {
	return (
		<section className="mx-auto flex max-w-[900px] flex-col gap-6 px-4 md:flex-row xl:px-0">
			<div>
				{/* <HomeFavorites items={items} /> */}
				<HomeAboutMe />
			</div>
		</section>
	)
}
