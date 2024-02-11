import { Category as FeatureParentCategory } from "@/components"
import { getBlogs, retrieveDatabase } from "@/utils/notion"

export default async function ParentCategory({ params }: { params: { parent?: string } }) {
    const parentCategoryKey = params.parent
    const blogs = await getBlogs({ parentCategoryKey })

    const database = await retrieveDatabase(process.env.NOTION_BLOGS_DATABASE_ID!)

    if (!blogs?.length) return <div>no blogs found for this parentCategoryKey: {parentCategoryKey}</div>

    return (
        <FeatureParentCategory
            items={blogs}
            params={params}
            type="parent"
            database={database}
        />
    )
}