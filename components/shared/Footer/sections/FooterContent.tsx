import { MenuItemType } from '@/types/prismic-types'
import { jost } from '@/utils/fonts'
import { MailOutline } from '@mui/icons-material'
import { Button } from '@mui/material'
import cn from 'classnames'
import Link from 'next/link'
import ScrollToTopButton from './ScrollToTopButton'
import BrandWithSocials from './BrandWithSocials'
import { getTranslations } from 'next-intl/server'
import { LocaleAll } from '@/types/locale'

export default async function FooterContent({
	menuItems,
	locale
}: {
	menuItems: MenuItemType[]
	locale: LocaleAll
}) {
	const t = await getTranslations({ namespace: 'Footer', locale })
	const tURI = await getTranslations({ namespace: 'URI', locale })

	return (
		<div className="max-w[900px] space-y-4 md:mx-8 md:flex md:justify-center md:gap-12 md:space-y-0">
			<BrandWithSocials />
			<div
				className={cn(
					'flex max-w-[400px] justify-center gap-4 md:gap-12',
					'md:border-l-2 md:border-white md:border-opacity-70 md:pl-12'
				)}
			>
				<div className="text-end md:grow md:text-start">
					<h4
						className={cn(
							'w-full font-extralight md:space-y-1',
							'border-b-[1px] border-white border-opacity-70'
						)}
					>
						{t('discover')}
					</h4>
					<div className="mx-auto my-2 max-w-[200px] md:mx-0 md:max-w-none md:space-y-1">
						{menuItems?.map(m => {
							return (
								<Button
									key={m.title}
									LinkComponent={Link}
									href={`/${tURI('category_uri')}${m.path}`}
									color="inherit"
									sx={{
										color: '#fff',
										padding: 0
									}}
									className={cn(
										jost.className,
										'flex justify-end pr-[2px] md:justify-start md:pl-[2px]',
										'hover:bg-transparent hover:underline'
									)}
								>
									{m.title}
								</Button>
							)
						})}
						{[
							// {
							// 	title: 'Galeri',
							// 	href: '/galeri'
							// },
							{
								title: t('about'),
								href: '/hakkimda'
							}
						].map(item => (
							<Button
								key={item.title}
								LinkComponent={Link}
								href={item.href}
								color="inherit"
								sx={{
									color: '#fff',
									padding: 0
								}}
								className={
									jost.className +
									' ' +
									'flex justify-end pr-[2px] hover:bg-transparent hover:underline md:justify-start md:pl-[2px]'
								}
							>
								{item.title?.toLocaleUpperCase('tr-TR')}
							</Button>
						))}
					</div>
				</div>
				<div
					className={cn(
						'border-l-2 border-white border-opacity-70 pl-4 text-start md:grow-[3]',
						'md:border-none md:border-opacity-100 md:pl-0'
					)}
				>
					<h4
						className={cn(
							'w-full font-extralight md:space-y-1',
							'border-b-[1px] border-white border-opacity-70'
						)}
					>
						{t('contact')}
					</h4>
					<div className="my-2 max-w-[300px] space-y-3 md:max-w-none">
						<p className="text-start">{t('contact_desc')}</p>
						<Button
							variant="outlined"
							color="inherit"
							href="mailto:hilalvisits@gmail.com"
							target="blank"
							startIcon={<MailOutline />}
						>
							{t('email')}
						</Button>
					</div>
				</div>
			</div>
			<ScrollToTopButton tooltipText={t('scroll_to_top')} />
		</div>
	)
}
