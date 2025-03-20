import { getBlogs, getMenuBySlug } from "@/utils/notion"
import { Category as FeatureSubCategory } from "@/components"

type Params = Promise<{ parent: string, category: string, sub: string }>

export default async function SubCategory({ params }: { params: Params}) {
    const { sub:slug } = await params
    const blogs = await getBlogs({ menu_slug: slug })
    const menu = await getMenuBySlug(slug ?? "")

    if (!blogs?.length) return <div>no blogs found for this slug: {slug}</div>

    return (
        <FeatureSubCategory
            items={blogs}
            menu={menu}
            slug={slug}
        />
    )
}