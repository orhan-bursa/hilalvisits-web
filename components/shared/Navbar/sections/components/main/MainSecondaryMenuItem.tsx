import cn from 'classnames'
import Link from 'next/link'
import { KeyboardArrowRight } from '@mui/icons-material'
import { MenuItemType } from '@/types/prismic-types'
import { getLocale, getTranslations } from 'next-intl/server'
import { localizeURI } from '@/lib/i18n'
import { LocaleAll } from '@/types/locale'

type Props = {
	item: MenuItemType
	locale: LocaleAll
}
export default async function MainSecondaryMenuItem({ item, locale }: Props) {
	const tURI = await getTranslations({ namespace: 'URI', locale })
	return (
		<div className="group/item relative cursor-pointer bg-amber-400">
			<Link href={localizeURI(`/${tURI('category_uri')}${item.path}`, locale)}>
				<p
					className={`border-l-4 border-transparent p-3 transition-all hover:border-amber-600 hover:bg-amber-500 group-hover/item:border-amber-500 group-hover:pl-4`}
				>
					{item.title}
				</p>
			</Link>
			<KeyboardArrowRight className="absolute right-3 top-3 transition-all group-hover/item:right-2" />
			<div
				className={cn(
					'absolute left-[100%] top-0 w-full bg-amber-400',
					'pointer-events-none opacity-0 duration-300 group-hover/item:pointer-events-auto group-hover/item:opacity-100',
					'-translate-x-3 group-hover/item:-translate-x-0'
				)}
			>
				{!!item.items && item.items.length > 0
					? item.items.map((c, idx) => {
							return (
								<Link key={idx} href={localizeURI(`/${tURI('category_uri')}${c.path}`, locale)}>
									<div className="bg-amber-400 p-3 pl-5 hover:bg-amber-500">{c.title}</div>
								</Link>
							)
						})
					: null}
			</div>
		</div>
	)
}
