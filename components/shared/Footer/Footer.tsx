import FooterContent from './sections/FooterContent'
import Link from 'next/link'
import { InfoPageDocument, MenuItemType } from '@/types/prismic-types'
import { Fragment } from 'react'

type Props = {
	menuItems: MenuItemType[]
	infoPages: InfoPageDocument[]
}
export default async function Footer({ menuItems, infoPages }: Props) {
	return (
		<footer className="flex h-full cursor-default flex-col items-center justify-center gap-4 bg-amber-400 px-2 pb-2 pt-8 text-white md:gap-6 md:px-0">
			<FooterContent menuItems={menuItems} />
			<div className="flex flex-col gap-2 text-xs sm:flex-row sm:gap-8">
				<div>
					<p>&copy; {new Date().getFullYear()} Hilal Visits, Tüm hakları saklıdır.</p>
				</div>
				<div className="flex gap-1">
					{infoPages.map((infoPage, key) => (
						<Fragment key={key}>
							<Link href={`/-/${infoPage.uid}`}>
								<p className="hover:underline">{infoPage.data.title_short}</p>
							</Link>
							{key !== infoPages.length - 1 && <p>•</p>}
						</Fragment>
					))}
				</div>
			</div>
		</footer>
	)
}
