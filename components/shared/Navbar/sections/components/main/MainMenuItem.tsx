import cn from 'classnames'
import { KeyboardArrowDown } from '@mui/icons-material'
import MainSecondaryMenuItem from './MainSecondaryMenuItem'
import { MenuItemType } from '@/types/prismic-types'

interface Props {
	item: MenuItemType
}
export default function MainMenuItem({ item }: Props) {
	const title = item.title

	return (
		<div className="group relative flex cursor-pointer px-2 pb-1 font-semibold duration-300 hover:text-amber-500">
			<p className="uppercase">{title}</p>
			<KeyboardArrowDown className="text-inherit" />
			<div
				className={cn(
					'absolute -left-2 top-10 z-50 min-w-[210px] -translate-y-2 bg-amber-400 text-white duration-300',
					'pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100'
				)}
			>
				{!!item.items && item.items?.length > 0
					? item.items.map((menu, ind) => {
							return <MainSecondaryMenuItem key={ind} item={menu} />
						})
					: null}
			</div>
		</div>
	)
}
