import { BlogPageDocument, MenuItemType } from '@/types/prismic-types'
import { LocaleAll } from '@/types/locale'
import { Breadcrumbs, Chip } from '@mui/material'
import cn from 'classnames'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import Image from 'next/image'
import { PrismicRichText } from '@prismicio/react'
import { localizeURI } from '@/lib/i18n'

type Props = {
	blogs: BlogPageDocument[]
	menuItems: MenuItemType[]
	locale: LocaleAll
}
export default async function BlogsPageContent({ blogs, menuItems, locale }: Props) {
	const t = await getTranslations({ namespace: 'BlogPage', locale })
	const tURI = await getTranslations({ namespace: 'URI', locale })
	return (
		<div className="my-8 space-y-6 md:space-y-12">
			<section className="mx-auto max-w-[1200px] space-y-3">
				<h2 className={cn('cursor-default px-4', 'text-center text-4xl font-semibold')}>
					{t('all_blogs')}
				</h2>
				<div className="flex justify-center">
					<Breadcrumbs>
						<Link color="inherit" href="/" className="uppercase hover:text-red-500 hover:underline">
							{t('home_page')}
						</Link>
						<p className="cursor-default font-bold uppercase">{t('blogs')}</p>
					</Breadcrumbs>
				</div>
				<div className="mb-2 flex justify-center gap-2">
					{menuItems?.map((m, key) => {
						return (
							<Link key={key} href={localizeURI(`/${tURI('category_uri')}${m.path}`, locale)}>
								<Chip
									label={m.title}
									className={cn(
										'cursor-pointer rounded bg-gray-500 text-white',
										'hover:bg-gray-600'
									)}
								/>
							</Link>
						)
					})}
				</div>
			</section>
			<section className="mx-auto w-full max-w-[1200px]">
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{blogs?.map((blog, key) => {
						return (
							<div className="col-span-1" key={key}>
								<Link href={`/blog/${blog.uid}`}>
									<div className="relative mb-3 aspect-[3/2] w-full cursor-pointer">
										<Image
											src={blog.data.cover.url ?? ''}
											alt={blog.data.cover.alt || ''}
											fill
											style={{ objectFit: 'cover' }}
											sizes={`
                      (max-width: 640px) 100vw,
                      (max-width: 1024px) calc((100vw-24px)/2),
                      (max-width: 1200px) calc((100vw-48px)/3),
                      calc((1200px-48px)/3)
                      `}
										/>
									</div>
									<h3 className="mb-3 cursor-pointer px-2 text-3xl font-bold hover:text-red-500 min-[1200px]:px-0">
										{blog.data.title}
									</h3>
								</Link>
								{/*FIXME FIX CATEGORY BADGE*/}
								{/*<div className="mb-3 flex flex-wrap gap-2 px-2 min-[1200px]:px-0">
										{[blog.data.category.data].map(c => (
											<Link key={c.title} href={`/`}>
												<Chip
													key={c.title}
													label={c.title}
													variant="outlined"
													size="small"
													className="cursor-pointer rounded border-stone-400 hover:border-black hover:bg-stone-100"
												/>
											</Link>
										))}
									</div>*/}
								<div className="prose prose-lg px-2 min-[1200px]:px-0">
									<PrismicRichText field={blog.data.description} />
								</div>
							</div>
						)
					})}
				</div>
			</section>
		</div>
	)
}
