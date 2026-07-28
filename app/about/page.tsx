import AboutPageContent from '@/components/features/About/AboutPageContent'
import { buildPageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata({
	title: 'Hakkımda',
	description:
		'Hilal Visits kurucusu Hilal hakkında — yönetmen ve seyahatsever. Seyahat deneyimlerini ve gezi rehberlerini paylaşıyor.',
	path: '/about'
})

const AboutPage = () => {
	return <AboutPageContent />
}

export default AboutPage
