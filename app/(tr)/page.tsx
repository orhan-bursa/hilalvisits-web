import HomePageContent from '@/components/features/Home/HomePageContent'
import { getBlogs } from '@/lib/prismic/services'
import { Metadata, NextPage } from 'next'

export const metadata: Metadata = {
	title: 'Hilal Visits | Hilalin Seyahat Rehberi',
	description: 'Türkiye ve dünyadan kareler paylaşan unutulmaz bir gezi rehberi.'
	//TODO: expand metadata and add meta images / socail media url images
}

const HomePage: NextPage = async () => {
	const blogs = await getBlogs('tr')

	return <HomePageContent photos={[]} blogs={blogs} />
}

export default HomePage
