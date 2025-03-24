import { getBlogs, getMenuBySlug } from '@/utils/notion'
import { Category as FeatureCategory } from '@/components'
import { destructureBlogProps, destructureMenuProps } from '@/utils'
import { Metadata } from 'next'

type Props = { params: Promise<{ parent: string; category: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { category: slug } = await params
	const blogs = await getBlogs({ menu_slug: slug })
	const menu = await getMenuBySlug(slug ?? '')

	if (!blogs || blogs.length === 0 || !menu) return {}

	const { title: menuTitle } = destructureMenuProps(menu)
	const { cover: firstBlogCover, title: firstBlogTitle } = destructureBlogProps(blogs[0])

	const title = `Hilal Visits | ${menuTitle}`
	const description = `Best blogs and traveling tips for ${menuTitle}`
	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			images: firstBlogCover
				? [
						{
							url: firstBlogCover,
							width: 384,
							height: 256,
							alt: `Cover image of the first blog post: ${firstBlogTitle}`
						}
					]
				: []
		}
	}
}

export default async function Category({ params }: Props) {
	const { category: slug } = await params
	const blogs = await getBlogs({ menu_slug: slug })
	const menu = await getMenuBySlug(slug ?? '')

	if (!blogs?.length) return <div>no blogs found for this slug: {slug}</div>

	return <FeatureCategory items={blogs} menu={menu} slug={slug} />
}
