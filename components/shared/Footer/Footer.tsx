import FooterContent from './sections/FooterContent'
import Link from 'next/link'
import { MenuItemType } from '@/types/prismic-types'

export default async function Footer({ menuItems }: { menuItems: MenuItemType[] }) {
	return (
		<footer className="flex h-full cursor-default flex-col items-center justify-center gap-4 bg-amber-400 px-2 pb-2 pt-8 text-white md:gap-6 md:px-0">
			<FooterContent menuItems={menuItems} />
			<div className="flex flex-col gap-2 text-xs sm:flex-row sm:gap-8">
				<div>
					<p>&copy; {new Date().getFullYear()} Hilal Visits, Tüm hakları saklıdır.</p>
				</div>
				<div className="flex gap-1">
					<Link href={'/-/kullanim-kosullari'}>
						<p className="hover:underline">Kullanım Koşulları</p>
					</Link>
					<p>•</p>
					<Link href={'/-/cerez-politikasi'}>
						<p className="hover:underline">Çerezler</p>
					</Link>
					<p>•</p>
					<Link href={'/-/gizlilik-politikasi'}>
						<p className="hover:underline">Gizlilik</p>
					</Link>
				</div>
			</div>
		</footer>
	)
}
