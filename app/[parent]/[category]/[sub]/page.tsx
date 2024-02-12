import { getBlogs, retrieveDatabase } from "@/utils/notion"
import { Category as FeatureSubCategory } from "@/components"

export default async function SubCategory({ params }: { params: { parent: string, category: string, sub: string } }) {
    const { parent, category, sub } = params
    const blogs = await getBlogs({ parentCategoryKey: parent, categoryKey: category, subCategoryKey: sub })

    const database = await retrieveDatabase(process.env.NOTION_BLOGS_DATABASE_ID!)

    if (!blogs?.length) return <div>no blogs found for this subCategoryKey: {sub}</div>

    return (
        <FeatureSubCategory
            items={blogs}
            params={params}
            type="sub"
            database={database}
        />
    )
}