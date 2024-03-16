import React from 'react'
import HomeFavorites from './HomeFavorites'
import HomeAboutMe from './HomeAboutMe'
import { BlogPageObject } from '@/types'

export default function HomeFavoritesAndAboutMe({ items }: { items?: BlogPageObject[] }) {
    return (
        <section className="max-w-[900px] mx-auto flex flex-col md:flex-row gap-6 px-4 xl:px-0">
            <HomeFavorites items={items} />
            <HomeAboutMe />
        </section>
    )
}
