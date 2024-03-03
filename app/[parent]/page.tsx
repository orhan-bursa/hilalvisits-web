import { Category as FeatureParentCategory } from "@/components"
import { getBlogs, getMenuBySlug } from "@/utils/notion"

export default async function ParentCategory({ params }: { params: { parent?: string } }) {
    const slug = params.parent
    const blogs = await getBlogs({ menu_slug: slug })
    const menu = await getMenuBySlug(slug ?? "")

    //TODO: add custom not found page
    if (!blogs?.length) return <div>no blogs found for this slug: {slug}</div>

    return (
        <FeatureParentCategory
            items={blogs}
            menu={menu}
            slug={slug}
        />
    )
}