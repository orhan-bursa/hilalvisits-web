import PhotoGrid from './sections/PhotoGrid'

export default function GaleriPageContent({ items }: { items?: any }) {
	return (
		<div className="my-4 space-y-12 md:my-8 md:space-y-16">
			<PhotoGrid items={items} />
		</div>
	)
}
