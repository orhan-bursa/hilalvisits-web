import { mapContent } from '@/utils'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export default function BlogDetailContent({
	blogContents
}: {
	blogContents?: BlockObjectResponse[]
}) {
	if (!blogContents) return <div>Blog içeriği bulunamadı.</div>

	return (
		<section className="mx-auto mb-12 mt-8 w-full space-y-4 px-4 text-lg md:max-w-[900px] xl:px-0">
			{blogContents.map((content, ind) => mapContent(content, ind))}
		</section>
	)
}
