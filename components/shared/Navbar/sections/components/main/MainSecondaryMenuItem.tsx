import cn from 'classnames'
import Link from 'next/link'
import { KeyboardArrowRight } from '@mui/icons-material'
import { MenuItemType } from '@/types/prismic-types'

export default function MainSecondaryMenuItem({ item }: { item: MenuItemType }) {
	return (
		<div className="group relative cursor-pointer bg-amber-400">
			<Link href={item.path}>
				<p
					className={`border-l-4 border-transparent p-3 transition-all hover:border-amber-600 hover:bg-amber-500 group-hover:border-amber-500 group-hover:pl-4`}
				>
					{item.title?.toLocaleUpperCase('tr-TR')}
				</p>
			</Link>
			<KeyboardArrowRight className="absolute right-3 top-3 transition-all group-hover:right-2" />
			<div
				className={cn(
					'absolute left-[100%] top-0 w-full bg-amber-400',
					'pointer-events-none opacity-0 duration-300 group-hover:pointer-events-auto group-hover:opacity-100',
					'-translate-x-3 group-hover:-translate-x-0'
				)}
			>
				{!!item.items && item.items.length > 0
					? item.items.map((c, idx) => {
							return (
								<Link key={idx} href={c.path}>
									<div className="bg-amber-400 p-3 pl-5 hover:bg-amber-500">{c.title}</div>
								</Link>
							)
						})
					: null}
			</div>
		</div>
	)
}
