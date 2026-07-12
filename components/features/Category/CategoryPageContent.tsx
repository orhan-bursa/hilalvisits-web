import { BlogPageDocument, CategoryPageDocument } from '@/types/prismic-types'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Chip from '@mui/material/Chip'
import Link from 'next/link'
import cn from 'classnames'
import BlogGrid from '@/components/shared/BlogGrid'

type Props = {
	blogs: BlogPageDocument[]
	category: CategoryPageDocument
	subCategories?: CategoryPageDocument[]
}
export default async function CategoryPageContent({ blogs, category, subCategories }: Props) {
	return (
		<div className="my-8 space-y-6 md:space-y-12">
			{/* HEADER */}
			<section className="mx-auto max-w-[1200px] space-y-3">
				<h2 className={cn('cursor-default px-4', 'text-center text-4xl font-semibold')}>
					{category.data.title} Blogları
				</h2>
				<div className="flex justify-center uppercase">
					<Breadcrumbs>
						<Link color="inherit" href="/blog" className="hover:text-red-500 hover:underline">
							Bloglar
						</Link>
						{!!category.data.parent_category?.uid && (
							<Link
								color="inherit"
								href={`/${category.data.parent_category?.uid}`}
								className="hover:text-red-500 hover:underline"
							>
								{category.data.parent_category?.data?.title}
							</Link>
						)}
						<p className="cursor-default last:font-bold">{category.data.title}</p>
					</Breadcrumbs>
				</div>
				{!!subCategories && subCategories.length > 0 && (
					<div className="mb-3 flex flex-wrap justify-center gap-2">
						{subCategories.map((c, i) => (
							<Link key={i} href={`/${c.data.parent_category.uid}/${c.uid}`}>
								<Chip
									label={c.data.title}
									className="cursor-pointer rounded bg-gray-500 text-white hover:bg-gray-600"
								/>
							</Link>
						))}
					</div>
				)}
			</section>
			{/* BLOGS */}
			<BlogGrid blogs={blogs} />
		</div>
	)
}
