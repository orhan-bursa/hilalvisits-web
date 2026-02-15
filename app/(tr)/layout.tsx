import AppLayout from '@/components/shared/Layout/AppLayout'
import { setRequestLocale } from 'next-intl/server'

type Props = {
	children: React.ReactNode
}

export default async function RootLayoutDefault({ children }: Props) {
	setRequestLocale('tr')
	return <AppLayout locale="tr">{children}</AppLayout>
}
