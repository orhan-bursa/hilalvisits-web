import AppLayout from '@/components/shared/Layout/AppLayout'

type Props = {
	children: React.ReactNode
}

export default async function RootLayoutDefault({ children }: Props) {
	return <AppLayout locale="tr">{children}</AppLayout>
}
