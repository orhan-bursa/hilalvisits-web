import HomePageContent from '@/components/features/Home/HomePageContent'
import { getBlogs } from '@/lib/prismic/services'
import { NextPage } from 'next'

const HomePage: NextPage = async () => {
	const blogs = await getBlogs('tr')

	return <HomePageContent photos={[]} blogs={blogs} />
}

export default HomePage
