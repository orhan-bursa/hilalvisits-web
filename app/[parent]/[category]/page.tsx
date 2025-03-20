import { getBlogs, getMenuBySlug } from "@/utils/notion"
import { Category as FeatureCategory } from "@/components"

type Params = Promise<{ parent:string, category: string }>

export default async function Category({ params }: { params: Params }) {
    const {category: slug} = await params
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