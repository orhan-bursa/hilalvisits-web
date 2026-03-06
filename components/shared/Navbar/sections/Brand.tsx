import { localizeURI } from '@/lib/i18n'
import { LocaleAll } from '@/types/locale'
import { whisper } from '@/utils/fonts'
import cn from 'classnames'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default function Brand({ locale }: { locale: LocaleAll }) {
	return (
		<div className={cn('brand text-center text-[80px]', 'whitespace-nowrap text-amber-400')}>
			<Link href={localizeURI('/', locale)}>
				<h1 className={cn(whisper.className, 'leading-[50px]')}>Hilal Visits</h1>
			</Link>
		</div>
	)
}
