import FooterContent from './sections/FooterContent'
import Link from 'next/link'
import { InfoPageDocument, MenuItemType } from '@/types/prismic-types'
import { getTranslations } from 'next-intl/server'
import { localizeURI } from '@/lib/i18n'
import { Fragment } from 'react'
import { LocaleAll } from '@/types/locale'

type Props = {
	menuItems: MenuItemType[]
	infoPages: InfoPageDocument[]
	locale: LocaleAll
}
export default async function Footer({ menuItems, infoPages, locale }: Props) {
	const t = await getTranslations({ namespace: 'Footer', locale })
	return (
		<footer className="flex h-full cursor-default flex-col items-center justify-center gap-4 bg-amber-400 px-2 pb-2 pt-8 text-white md:gap-6 md:px-0">
			<FooterContent menuItems={menuItems} locale={locale} />
			<div className="flex flex-col gap-2 text-xs sm:flex-row sm:gap-8">
				<div>
					<p>
						&copy; {new Date().getFullYear()} {t('all_rights_reserved')}
					</p>
				</div>
				<div className="flex gap-1">
					{infoPages.map((infoPage, key) => (
						<Fragment key={key}>
							<Link href={localizeURI(`/-/${infoPage.uid}`, locale)}>
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
