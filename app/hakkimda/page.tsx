import { Info as FeatureInfo } from "@/components";
import { getBlockChildren, getInfoPageBySlug } from "@/utils/notion";
import { notFound } from "next/navigation";

export default async function Info() {
    const slug = "hakkimda"
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