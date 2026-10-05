import { GeoLocationSliceType } from '@/types/prismic-types'
import { isFilled } from '@prismicio/client'

type Props = {
	slice: GeoLocationSliceType
}

const DEFAULT_ZOOM = 16

const GeoLocationSlice: React.FC<Props> = ({ slice }) => {
	if (!isFilled.geoPoint(slice.primary.location)) return null

	const { latitude, longitude } = slice.primary.location
	const coords = `${latitude},${longitude}`
	const placeName = slice.primary.place_name?.trim()

	// With a place name, Google searches for it near the coordinates and shows its details card.
	// Without one, we fall back to a plain pin on the coordinates.
	const query = encodeURIComponent(placeName || coords)
	const src = `https://maps.google.com/maps?q=${query}&ll=${coords}&z=${DEFAULT_ZOOM}&hl=tr&output=embed`
	const externalUrl = `https://www.google.com/maps/search/?api=1&query=${query}`

	return (
		<section className="my-6 flex flex-col items-center gap-2 px-6 md:px-12">
			<div className="w-full overflow-hidden rounded-lg">
				<iframe
					title={placeName ? `Harita: ${placeName}` : `Harita konumu (${coords})`}
					src={src}
					className="aspect-video w-full border-0"
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
					allowFullScreen
				/>
			</div>
			<a
				href={externalUrl}
				target="_blank"
				rel="noopener noreferrer"
				className="text-sm underline underline-offset-2 opacity-70 hover:opacity-100"
			>
				{placeName ? `${placeName} – Google Haritalar'da aç` : "Google Haritalar'da aç"}
			</a>
		</section>
	)
}

export default GeoLocationSlice
