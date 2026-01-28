interface Props {
	infoPage: any
	infoPageContents?: any[]
}

export default function InfoPageContent({ infoPage, infoPageContents }: Props) {
	return null
	// const { title } = destructureInfoPageProps(infoPage)
	// return (
	// 	<div className="my-10 flex w-full flex-col items-center">
	// 		<section className="w-full md:max-w-[900px]">
	// 			<h1 className="min-h-16 text-start text-2xl font-semibold">{title}</h1>
	// 		</section>
	// 		<section className="mx-auto mb-12 mt-8 w-full md:max-w-[900px]">
	// 			{infoPageContents?.map((content, ind) => mapContent(content, ind))}
	// 		</section>
	// 	</div>
	// )
}
