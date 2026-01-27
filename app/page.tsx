import { Home as FeatureHome } from '@/components'
import prismicClient from '@/lib/prismic'
import { BlogPageDocument } from '@/types/prismic-types'
import { getBlogs, getPhotos } from '@/utils/notion'
export default async function Home() {
	const blogs = await prismicClient.getAllByType<BlogPageDocument>('blog')

	const photos = await getPhotos()

	return <FeatureHome photos={photos} blogs={blogs} />
}
