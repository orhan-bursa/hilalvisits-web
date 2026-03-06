import { LocaleAll } from '@/types/locale'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

export default async function HomeAboutMe({ locale }: { locale: LocaleAll }) {
	const t = await getTranslations({ namespace: 'HomePage', locale })
	return (
		<section className="mx-auto flex max-w-[900px] flex-col gap-6 px-4 md:flex-row xl:px-0">
			<div className="flex w-full flex-col items-center gap-8 sm:flex-row">
				<div className="aspect-square w-full max-w-[300px] overflow-hidden rounded-full">
					<Image
						src="/images/about/maldives_1.jpg"
						alt="hilal at maldives"
						width={600}
						height={600}
						className="h-full w-full object-cover duration-1000"
					/>
				</div>
				<div className="py-4">
					<h2 className="mb-6 w-full cursor-default text-start text-4xl font-semibold">
						{t('whoami')}
					</h2>
					<p className="text-gray-600">
						{t.rich('whoami_desc', {
							span: chunks => <span className="italic">{chunks}</span>,
							br: _chunks => <br />
						})}
					</p>
				</div>
			</div>
		</section>
	)
}
