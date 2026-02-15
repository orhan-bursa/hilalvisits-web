import { Breadcrumbs, Chip } from '@mui/material'
import Link from 'next/link'
import cn from 'classnames'
import { CategoryPageDocument } from '@/types/prismic-types'
import { getLocale, getTranslations } from 'next-intl/server'
import { localizeURI } from '@/lib/i18n'

interface Props {
	category: CategoryPageDocument
	subCategories?: CategoryPageDocument[]
}

export default async function CategoryHeader({ category, subCategories }: Props) {
	const locale = await getLocale()
	const t = await getTranslations('CategoryPage')

	return (
		<section className="mx-auto max-w-[1200px] space-y-3">
			<h2 className={cn('cursor-default px-4', 'text-center text-4xl font-semibold')}>
				{t('category_blogs', { category: category.data.title })}
			</h2>
			<div className="flex justify-center uppercase">
				<Breadcrumbs>
					<Link
						color="inherit"
						href={localizeURI('/', locale)}
						className="hover:text-red-500 hover:underline"
					>
						{t('home_page')}
					</Link>
					{!!category.data.parent_category?.uid ? (
						<>
							<Link
								color="inherit"
								href={localizeURI(
									`/${t('category_uri')}/${category.data.parent_category?.uid}`,
									locale
								)}
								className="hover:text-red-500 hover:underline"
							>
								{category.data.parent_category?.data?.title}
							</Link>
							<p className="cursor-default font-bold">{category.data.title}</p>
						</>
					) : (
						<Link color="inherit" href="/" className="hover:text-red-500 hover:underline">
							{category.data.title}
						</Link>
					)}
				</Breadcrumbs>
			</div>
			{!!subCategories && subCategories.length > 0 && (
				<div className="mb-3 flex flex-wrap justify-center gap-2">
					{subCategories.map((c, i) => (
						<Link
							key={i}
							href={localizeURI(
								`/${t('category_uri')}/${c.data.parent_category.uid}/${c.uid}`,
								locale
							)}
						>
							<Chip
								label={c.data.title}
								className="cursor-pointer rounded bg-gray-500 text-white hover:bg-gray-600"
							/>
						</Link>
					))}
				</div>
			)}
		</section>
	)
}
