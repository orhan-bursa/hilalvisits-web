import type { Metadata } from 'next'
import './globals.css'
import AppLayout from '@/components/shared/Layout/AppLayout'

export const metadata: Metadata = {
	title: 'Hilal Visits',
	description: 'Your go to blog for traveling adventures!'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return <AppLayout locale="tr">{children}</AppLayout>
}
