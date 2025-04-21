import CustomButtonHoverInvert from '@/components/ui/CustomButtonHoverInvert'
import Link from 'next/link'

export default function NotFound() {
	return (
		<div className="flex h-[calc(100vh-300px)] items-center justify-center">
			<div className="w-max pb-10 pt-2 text-center">
				<h2 className="mb-4 text-6xl font-semibold">404</h2>
				<h2 className="mb-2 text-4xl font-semibold">Sayfa bulunamadı</h2>

				<p>Aradığınız sayfa veya blog bulunamadı.</p>
				<CustomButtonHoverInvert LinkComponent={Link} href={'/'} sx={{ mt: 2 }}>
					Ana sayfaya dön
				</CustomButtonHoverInvert>
			</div>
		</div>
	)
}
