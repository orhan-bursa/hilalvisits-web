import Image from 'next/image'

const IMAGES = [
	{
		path: '/images/about/maldives_1.jpg',
		alt: 'Hilal in Maldives'
	},
	{
		path: '/images/about/maldives_2.jpg',
		alt: 'Hilal in Maldives 2'
	},
	{
		path: '/images/about/cappadocia_1.jpg',
		alt: 'Hilal in Cyprus'
	},
	{
		path: '/images/about/hallstatt_1.jpeg',
		alt: 'Hilal in Hallstatt'
	},
	{
		path: '/images/about/yezd_1.jpg',
		alt: 'Hilal in Yezd'
	},
	{
		path: '/images/about/zurich_1.jpeg',
		alt: 'Hilal in Zurich'
	}
]

const text = (
	<>
		<span className="italic">Merhaba, sayfama hoşgeldin.</span>
		<br />
		<br />
		Hakkımda kısmına ne yazacağımı çok düşündüm ve bulamadım 🙂 Kısaca bahsetmek gerekirse
		yönetmenim ve seyahatseverim. Planlamasını tamamen kendim yaptığım seyahatlerde gezip gördüğüm
		yerleri, olumlu-olumsuz tecrübelerimi hem kendime günlük gibi, hem de seyahat etmek isteyenlere
		faydalı olur umuduyla Instagram hesabımda ve bu blogda paylaşıyorum. “Şu konudan da bahsetsen
		çok iyi olur” ya da “buraya da mutlaka gitmelisin” dediğiniz öneriler varsa bana yazarsanız çok
		sevinirim. Umarım keyif alacağınız bir sayfa olmuştur. Sayfanın mimarı eşime de buradan
		teşekkürü bir borç bilir, iyi okumalar dilerim.
		<br />
		<br />
		Hilal 🌸
	</>
)
export default function About() {
	const profile = IMAGES[0]
	const cover = IMAGES[1]
	return (
		<div className="my-10 flex w-full flex-col items-center">
			<section className="relative mx-auto flex w-full flex-col items-center justify-center md:max-w-[1000px]">
				<div className="relative mb-8 h-[450px] w-full">
					<Image
						src={cover.path}
						alt={cover.alt}
						fill
						sizes="1200px"
						className="object-cover object-[50%_72%]"
					/>
				</div>
			</section>
			<section className="mx-auto mb-12 mt-8 flex w-full items-center gap-8 md:max-w-[900px]">
				<div className="relative h-[250px] w-[250px] overflow-hidden rounded-full">
					<Image fill src={profile.path} alt={profile.alt} sizes="200px" className="object-cover" />
				</div>
				<div className="w-2/3">
					<h1 className="min-h-16 mb-4 text-start text-2xl font-semibold">Ben Kimim?</h1>
					<p className="text-gray-600">{text}</p>
				</div>
			</section>
			<section className="mt-8 grid w-full grid-cols-4 gap-4 md:max-w-[900px]">
				{IMAGES.slice(2).map((item, index) => (
					<div
						className="relative h-[300px] w-full min-w-[200px] max-w-[450px] overflow-hidden"
						key={index}
					>
						<Image fill src={item.path} alt={item.alt} sizes="200px" className="object-cover" />
					</div>
				))}
			</section>
		</div>
	)
}
