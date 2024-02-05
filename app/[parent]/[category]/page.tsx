import { getBlogs } from "@/utils/notion"
import { Category as FeatureCategory } from "@/components"

export default async function Category({ params }: { params: { parent: string, category: string } }) {
    const { parent, category } = params
    const blogs = await getBlogs({ parentCategoryKey: parent, categoryKey: category })

    if (!blogs?.length) return <div>no blogs found for this categoryKey: {category}</div>

    return <FeatureCategory items={blogs} type="default" />
}