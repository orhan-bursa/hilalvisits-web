import { BlogPageDocument, MenuItemType } from '@/types/prismic-types'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Chip from '@mui/material/Chip'
import cn from 'classnames'
import Link from 'next/link'
import BlogGrid from '@/components/shared/BlogGrid'

type Props = {
	blogs: BlogPageDocument[]
	menuItems: MenuItemType[]
}
export default async function BlogsPageContent({ blogs, menuItems }: Props) {
	return (
		<div className="my-8 space-y-6 md:space-y-12">
			<section className="mx-auto max-w-[1200px] space-y-3">
				<h2 className={cn('cursor-default px-4', 'text-center text-4xl font-semibold')}>
					Tüm Bloglar
				</h2>
				<div className="flex justify-center">
					<Breadcrumbs>
						<Link color="inherit" href="/" className="uppercase hover:text-red-500 hover:underline">
							Ana Sayfa
						</Link>
					</Breadcrumbs>
				</div>
				<div className="mb-2 flex justify-center gap-2">
					{menuItems?.map((m, key) => {
						return (
							<Link key={key} href={m.path}>
								<Chip
									label={m.title}
									className={cn(
										'cursor-pointer rounded bg-gray-500 text-white',
										'hover:bg-gray-600'
									)}
								/>
							</Link>
						)
					})}
				</div>
			</section>
			<BlogGrid blogs={blogs} />
		</div>
	)
}
