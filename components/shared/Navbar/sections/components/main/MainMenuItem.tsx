'use client'
import { Dispatch, SetStateAction, useMemo } from 'react'
import cn from 'classnames'
import { KeyboardArrowDown } from '@mui/icons-material'
import MainSecondaryMenuItem from './MainSecondaryMenuItem'
import { MenuItemType } from '@/types/prismic-types'

interface Props {
	open: string | null
	setOpen: Dispatch<SetStateAction<string | null>>
	item: MenuItemType
}
export default function MainMenuItem({ item, open, setOpen }: Props) {
	const title = item.title
	const isOpen = useMemo(() => open === title, [open, title])

	return (
		<div
			className="relative flex cursor-pointer px-2 pb-1 font-semibold duration-300 hover:text-amber-500"
			onClick={() => {
				setOpen(!isOpen ? title : null)
			}}
		>
			<p className={isOpen ? 'text-amber-500' : 'text-inherit'}>
				{title?.toLocaleUpperCase('tr-TR')}
			</p>
			<KeyboardArrowDown className={isOpen ? 'text-amber-400' : 'text-inherit'} />
			<div
				className={cn(
					'absolute -left-2 top-10 z-50 min-w-[210px] -translate-y-2 bg-amber-400 text-white duration-300',
					{
						'transform-none opacity-100': isOpen,
						'pointer-events-none opacity-0': !isOpen
					}
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
