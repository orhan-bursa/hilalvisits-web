import { BlockObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

function getRichTextWithAnnotations(item: RichTextItemResponse, key: any, otherClassNames?: string) {
    const { href, plain_text } = item
    const { bold, italic, underline } = item.annotations


    if (!bold && !italic && !underline) return href ? (
        <Link href={href ?? "/"} target="_blank" prefetch={false}>
            {item?.plain_text}
        </Link>
    ) : item?.plain_text

    const result = <span className={cn(
        otherClassNames,
        bold ? "font-bold" : "",
        italic ? "italic" : "",
        underline ? "underline" : ""
    )}>
        {plain_text}
    </span>
    return href ? (
        <Link href={href ?? "/"} target="_blank" prefetch={false}>
            {result}
        </Link>
    ) : result
}

export function mapContent(content: BlockObjectResponse, index: number) {
    const key = content.id + index
    switch (content?.type) {
        case "heading_1":
            if (content.heading_1.rich_text.length === 0) return <div key={key} style={{ height: 64 }}></div>
            const h1item = content.heading_1.rich_text?.[0]
            return (
                <h1 key={key} className={cn(
                    "text-4xl min-h-16 text-center",
                    h1item?.annotations?.bold ? "font-bold" : "",
                    h1item?.annotations?.italic ? "italic" : "",
                    h1item?.annotations?.underline ? "underline" : ""
                )}>
                    {h1item?.plain_text}
                </h1>
            )
        case "heading_2":
            if (content.heading_2.rich_text.length === 0) return <div key={key} style={{ height: 48 }}></div>
            const h2item = content.heading_2.rich_text?.[0]
            return (
                <h2 key={key} className={cn(
                    "text-3xl min-h-12",
                    h2item?.annotations?.bold ? "font-bold" : "",
                    h2item?.annotations?.italic ? "italic" : "",
                    h2item?.annotations?.underline ? "underline" : ""
                )}>
                    {h2item?.plain_text}
                </h2>
            )
        case "heading_3":
            if (content.heading_3.rich_text.length === 0) return <div key={key} style={{ height: 32 }}></div>
            const h3item = content.heading_3.rich_text?.[0]
            return (
                <h3 key={key} className={cn(
                    "text-2xl min-h-8",
                    h3item?.annotations?.bold ? "font-bold" : "",
                    h3item?.annotations?.italic ? "italic" : "",
                    h3item?.annotations?.underline ? "underline" : ""
                )}>
                    {h3item?.plain_text}
                </h3>
            )

        case "paragraph":
            if (content.paragraph.rich_text.length === 0) return <div key={key} style={{ height: 24 }}></div>
            return (
                <div key={key} className="min-h-6">
                    {content.paragraph.rich_text.map((item, ind) => getRichTextWithAnnotations(item, key + ind))}
                </div>
            )
        case "image":
            return (
                <div key={key} className="min-h-[300px] w-full h-full relative">
                    <Image
                        alt={content.id + " image"}
                        src={content?.image?.type === "file" ? content?.image?.file?.url : content?.image?.external?.url}
                        width={900}
                        height={900}
                        style={{ objectFit: "cover" }}
                    />
                    {content?.image?.caption ?
                        <p className="text-[#373737a6] text-sm pt-2 px-1">
                            {content.image.caption.map((item, ind) => getRichTextWithAnnotations(item, key + ind))}
                        </p>
                        : null}
                </div>
            )
        case "bulleted_list_item":
            if (content.bulleted_list_item.rich_text.length === 0) return <div key={key} style={{ height: 24 }}></div>
            return (
                <li key={key}>
                    {content.bulleted_list_item.rich_text.map((item, ind) => getRichTextWithAnnotations(item, key + ind))}
                </li>
            )
        default:
            return (
                <div>************Content type not yet added to mapper************</div>
            )
    }
}