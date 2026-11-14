import { whisper } from '@/utils/fonts'
import cn from 'classnames'
import Link from 'next/link'

export default function Brand() {
	return (
		<div className={cn('brand text-center text-[80px]', 'whitespace-nowrap text-amber-400')}>
			<Link href="/">
				<span className={cn(whisper.className, 'block pr-2 leading-[50px] sm:pr-0')}>Hilal Visits</span>
			</Link>
		</div>
	)
}
