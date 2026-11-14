import CustomButtonHoverInvert from '@/components/ui/CustomButtonHoverInvert'

export default function NotFound() {
	return (
		<div className="flex h-[calc(100vh-300px)] items-center justify-center">
			<div className="w-max pb-10 pt-2 text-center">
				<p className="mb-4 text-6xl font-semibold">404</p>
				<h1 className="mb-2 text-4xl font-semibold">Sayfa bulunamadı</h1>

				<p>Aradığınız sayfa veya blog bulunamadı.</p>
				<CustomButtonHoverInvert href={'/'} sx={{ mt: 2 }}>
					Ana sayfaya dön
				</CustomButtonHoverInvert>
			</div>
		</div>
	)
}
