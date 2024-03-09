import { InfoPageObject } from "@/types/page";
import { destructureInfoPageProps, mapContent } from "@/utils";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

interface IPropTypes {
    infoPage: InfoPageObject,
    infoPageContents?: BlockObjectResponse[]
}

export default function Info({ infoPage, infoPageContents }: IPropTypes) {
    const { title } = destructureInfoPageProps(infoPage)
    return (
        <div className="w-full flex flex-col items-center">
            <section className="w-full md:max-w-[900px]">
                <h1 className="text-2xl min-h-16 text-start font-semibold">
                    {title}
                </h1>
            </section>
            <section className="mx-auto w-full md:max-w-[900px] mt-8 mb-12">
                {infoPageContents?.map((content, ind) => mapContent(content, ind))}
            </section>
        </div>
    )
}