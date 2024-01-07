import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export default function BlogDetailHero({ data }: { data: PageObjectResponse }) {
    return (
        <section className="w-full h-full min-h-[600px] flex flex-col md:flex-row mt-2 md:p-8">
            Hero section
        </section>
    )
}