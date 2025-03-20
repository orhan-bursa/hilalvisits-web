import { Info as FeatureInfo } from "@/components";
import { getBlockChildren, getInfoPageBySlug } from "@/utils/notion";
import { notFound } from "next/navigation";


type Params = Promise<{ slug: string }>

export default async function Page({ params }: { params: Params }) {
    const { slug } = await params
    const infoPage = await getInfoPageBySlug(slug)

    if (!infoPage) return notFound();
    const infoPageContents = await getBlockChildren(infoPage.id)

    return (
        <FeatureInfo
            infoPage={infoPage}
            infoPageContents={infoPageContents}
        />
    )
}