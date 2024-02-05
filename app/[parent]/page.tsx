import { Category as FeatureParentCategory } from "@/components"
import { BlogPageObject } from "@/types"
import { array } from "@/utils"
import { getBlogs } from "@/utils/notion"

export default async function ParentCategory({ params }: { params: { parent: string } }) {
    const parentCategoryKey = params.parent
    const blogs = await getBlogs({ parentCategoryKey })

    if (!blogs?.length) return <div>no blogs found for this parentCategoryKey: {parentCategoryKey}</div>

    return <FeatureParentCategory items={blogs} type="parent" />
}