import { getBlogs, getMenuBySlug, retrieveDatabase } from "@/utils/notion"
import { Category as FeatureCategory } from "@/components"

export default async function Category({ params }: { params: { parent: string, category: string } }) {
    const slug = params.category
    const blogs = await getBlogs({ menu_slug: slug })
    const menu = await getMenuBySlug(slug ?? "")

    if (!blogs?.length) return <div>no blogs found for this slug: {slug}</div>

    return (
        <FeatureCategory
            items={blogs}
            menu={menu}
            slug={slug}
        />
    )
}