import { mapContent } from "@/utils";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export default async function BlogDetailContent({ blogContents }: { blogContents?: BlockObjectResponse[] }) {

    if (!blogContents) return <div>There are no blog contents found</div>

    return (
        <section className="mx-auto w-full md:max-w-[900px] mt-8 mb-12">
            {blogContents.map((content, ind) => mapContent(content, ind))}
        </section>
    )
}