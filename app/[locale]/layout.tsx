import { LocaleDynamic } from '@/types/locale'
import AppLayout from '@/components/shared/Layout/AppLayout'

type Props = {
	children: React.ReactNode
	params: Promise<{ locale: LocaleDynamic }>
}

export default async function RootLayoutWithLocale({ children, params }: Props) {
	const { locale } = await params

	return <AppLayout locale={locale}>{children}</AppLayout>
}

//Generate static paths for dynamic locale param (only 'en' for now)
export async function generateStaticParams() {
	return [{ locale: 'en' }]
}
