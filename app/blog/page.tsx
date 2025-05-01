import { Blogs as FeatureBlogs } from '@/components/features'
import { getBlogs } from '@/utils/notion'
import { Alert } from '@mui/material'
import { notFound } from 'next/navigation'

export default async function Blog() {
	const blogs = await getBlogs()

	if (!blogs?.length) return notFound()

	return <FeatureBlogs blogs={blogs} />
}
