import { Country as FeatureCountry } from "@/components"
import { BlogPageObject } from "@/types"
import { array } from "@/utils"
import { getBlogs } from "@/utils/notion"

export default async function Country({ params }: { params: { country: string } }) {
    const country = params.country
    const blogs = await getBlogs({ country })

    if (!blogs?.length) return <div>no blogs found for this country: {country}</div>
    console.log("blogs: ", blogs);

    return <FeatureCountry items={blogs} />
}