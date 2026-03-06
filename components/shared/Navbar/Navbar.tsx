import { MenuItemType } from '@/types/prismic-types'
import Brand from './sections/Brand'
import DesktopMenu from './sections/DesktopMenu'
import cn from 'classnames'
import MobileMenu from './sections/MobileMenu'
import { LocaleAll } from '@/types/locale'

type Props = {
	menuItems: MenuItemType[]
	locale: LocaleAll
}
export default function Navbar({ locale, menuItems }: Props) {
	return (
		<nav
			className={cn(
				'mx-auto h-full w-full max-w-[1200px] bg-white pt-6 md:pb-6 md:pt-10',
				'md:flex md:gap-8',
				'md:px-4 xl:px-0'
			)}
		>
			<Brand locale={locale} />
			<DesktopMenu menuItems={menuItems} locale={locale} />
			<MobileMenu menuItems={menuItems} locale={locale} />
		</nav>
	)
}
