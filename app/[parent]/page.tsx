import { Category as FeatureParentCategory } from "@/components"
import { getBlogs, getMenuBySlug } from "@/utils/notion"

type Params = Promise<{ parent: string }>

export default async function ParentCategory({ params }: { params: Params }) {
    const {parent: slug} = await params
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