import { Category as FeatureParentCategory } from '@/components'
import { destructureBlogProps, destructureMenuProps } from '@/utils'
import { getBlogs, getMenuBySlug } from '@/utils/notion'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ parent: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { parent: slug } = await params
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
							//TODO: update image size
							width: 384,
							height: 256,
							alt: `Cover image of the first blog post: ${firstBlogTitle}`
						}
					]
				: []
		}
	}
}

export default async function ParentCategory({ params }: Props) {
	const { parent: slug } = await params
	const blogs = await getBlogs({ menu_slug: slug })

	if (!blogs?.length) return notFound()

	const menu = await getMenuBySlug(slug ?? '')

	return <FeatureParentCategory items={blogs} menu={menu} slug={slug} />
}
