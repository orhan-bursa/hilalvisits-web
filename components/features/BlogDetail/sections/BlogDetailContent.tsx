import { getBlockChildren } from "@/utils/notion";
import { BlockObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

function getRichTextWithAnnotations(item: RichTextItemResponse, otherClassNames?: string) {
    const { href, plain_text } = item
    const { bold, italic, underline } = item.annotations
    if (!bold && !italic && !underline) return item?.plain_text

    const result = <span className={cn(
        otherClassNames,
        bold ? "font-bold" : "",
        italic ? "italic" : "",
        underline ? "underline" : ""
    )}>
        {plain_text}
    </span>
    return href ? <Link href={href ?? "/"} target="_blank">{result}</Link> : result
}

async function mapBlogContent(content: BlockObjectResponse) {
    switch (content?.type) {
        case "heading_1":
            if (content.heading_1.rich_text.length === 0) return <div className="h-16"></div>
            const h1item = content.heading_1.rich_text?.[0]
            return (
                <h1 key={content.id} className={cn(
                    "text-4xl min-h-16",
                    h1item?.annotations?.bold ? "font-bold" : "",
                    h1item?.annotations?.italic ? "italic" : "",
                    h1item?.annotations?.underline ? "underline" : ""
                )}>
                    {h1item?.plain_text}
                </h1>
            )
        case "heading_2":
            if (content.heading_2.rich_text.length === 0) return <div className="h-12"></div>
            const h2item = content.heading_2.rich_text?.[0]
            return (
                <h2 key={content.id} className={cn(
                    "text-3xl min-h-12",
                    h2item?.annotations?.bold ? "font-bold" : "",
                    h2item?.annotations?.italic ? "italic" : "",
                    h2item?.annotations?.underline ? "underline" : ""
                )}>
                    {h2item?.plain_text}
                </h2>
            )
        case "heading_3":
            if (content.heading_3.rich_text.length === 0) return <div className="h-8"></div>
            const h3item = content.heading_3.rich_text?.[0]
            return (
                <h3 key={content.id} className={cn(
                    "text-2xl min-h-8",
                    h3item?.annotations?.bold ? "font-bold" : "",
                    h3item?.annotations?.italic ? "italic" : "",
                    h3item?.annotations?.underline ? "underline" : ""
                )}>
                    {h3item?.plain_text}
                </h3>
            )

        case "paragraph":
            if (content.paragraph.rich_text.length === 0) return <div className="h-6"></div>
            return (
                <div key={content.id} className="min-h-6">
                    {content.paragraph.rich_text.map(item => getRichTextWithAnnotations(item))}
                </div>
            )
        case "image":
            return (
                <div className="min-h-[300px] w-full h-full relative aspect-video">
                    <Image
                        alt={content.id + " image"}
                        src={content.image.type === "file" ? content.image.file.url : content.image.external.url}
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </div>
            )
        case "bulleted_list_item":
            if (content.bulleted_list_item.rich_text.length === 0) return <div className="h-6" key={content.id}><li></li></div>
            return (
                <li key={content.id}>
                    {content.bulleted_list_item.rich_text.map(item => getRichTextWithAnnotations(item))}
                </li>
            )

        default:
            return (
                <div>************Content type not yet added to mapper************</div>
            )
    }
}


export default async function BlogDetailContent({ blogContents }: { blogContents?: BlockObjectResponse[] }) {

    if (!blogContents) return <div>There are no blog contents found</div>

    return (
        <section className="mx-auto w-full md:max-w-[900px]">
            {blogContents.map(async content => await mapBlogContent(content))}
        </section>
    )
}