import { MenuItemType } from '@/types/prismic-types'
import { Breadcrumbs, Chip } from '@mui/material'
import cn from 'classnames'
import Link from 'next/link'

export default function BlogHeader({ menuItems }: { menuItems?: MenuItemType[] }) {
	return (
		<section className="mx-auto max-w-[1200px] space-y-3">
			<h2 className={cn('cursor-default px-4', 'text-center text-4xl font-semibold')}>
				TÜM BLOGLAR
			</h2>
			<div className="flex justify-center">
				<Breadcrumbs>
					<Link color="inherit" href="/" className="hover:text-red-500 hover:underline">
						ANA SAYFA
					</Link>
					<p className="cursor-default font-bold">{'BLOG'}</p>
				</Breadcrumbs>
			</div>
			<div className="mb-2 flex justify-center gap-2">
				{menuItems?.map((m, key) => {
					return (
						<Link key={key} href={m.path}>
							<Chip
								label={m.title}
								className={cn('cursor-pointer rounded bg-gray-500 text-white', 'hover:bg-gray-600')}
							/>
						</Link>
					)
				})}
			</div>
		</section>
	)
}
