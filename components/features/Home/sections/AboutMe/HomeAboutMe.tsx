import Image from 'next/image'

export default async function HomeAboutMe() {
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
						Ben Kimim?
					</h2>
					<p className="text-gray-600">
						<span className="italic">Merhaba, sayfama hoşgeldin.</span>
						<br />
						<br />
						Kısaca bahsetmek gerekirse yönetmenim ve seyahatseverim. Planlamasını tamamen kendim
						yaptığım seyahatlerde gezip gördüğüm yerleri, olumlu-olumsuz tecrübelerimi hem kendime
						günlük gibi, hem de seyahat etmek isteyenlere faydalı olur umuduyla Instagram hesabımda
						ve bu blogda paylaşıyorum.
					</p>
				</div>
			</div>
		</section>
	)
}
