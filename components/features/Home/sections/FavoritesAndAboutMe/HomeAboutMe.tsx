import Image from 'next/image'

export default function HomeAboutMe() {
	return (
		<div className="flex w-full gap-8">
			<div
				className="aspect-square w-full max-w-[300px] overflow-hidden rounded-full"
				// style={{
				// 	WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 100%)',
				// 	maskImage: 'radial-gradient(circle, black 60%, transparent 100%)'
				// }}
			>
				<Image
					src="/images/about/maldives_1.jpg"
					alt="hilal kulüp maldives resmi"
					width={800}
					height={800}
					className="h-full w-full object-cover duration-1000"
				/>
			</div>
			<div className="py-4">
				<h2 className="mb-6 w-full cursor-default text-start text-4xl font-semibold">Ben Kimim?</h2>
				<p className="text-gray-600">
					<span className="italic">Merhaba, sayfama hoşgeldin.</span>
					<br />
					<br />
					Kısaca bahsetmek gerekirse yönetmenim ve seyahatseverim. Planlamasını tamamen kendim
					yaptığım seyahatlerde gezip gördüğüm yerleri, olumlu-olumsuz tecrübelerimi hem kendime
					günlük gibi, hem de seyahat etmek isteyenlere faydalı olur umuduyla Instagram hesabımda ve
					bu blogda paylaşıyorum.
				</p>
			</div>
		</div>
	)
}
