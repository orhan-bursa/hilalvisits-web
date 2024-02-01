import { BlogPageObject } from "@/types";
import { destructureBlogProps } from "@/utils";
import { whisper } from "@/utils/fonts";
import { Chip } from "@mui/material";
import cn from "classnames";
import Image from "next/image";

export default function BlogDetailHero({ data }: { data: BlogPageObject }) {
    const { title, tags, cover } = destructureBlogProps(data)

    return (
        <section className="w-full h-full min-h-[600px] flex flex-col md:flex-row mt-2 md:p-8">
            <div className={cn(
                "w-full md:w-[40%] order-2 md:order-1",
                "px-4 py-2",
            )}>
                <h1 className={cn(
                    whisper.className,
                    " ",
                    "text-amber-400 underline underline-offset-8 mb-4 pl-4",
                    "text-5xl sm:text-6xl md:text-7xl lg:text-8xl",

                )}>
                    {title}
                </h1>
                <p className="text-lg">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non
                    asperiores officia officiis aliquam nostrum distinctio dolores
                    explicabo excepturi, mollitia illum!
                </p>
                <div className="flex flex-wrap">
                    {tags.map(tag => {
                        return <Chip label={tag.name} sx={{ backgroundColor: tag.color }} />
                    })}
                </div>
            </div>
            <div className={cn(
                "w-full md:w-[60%] border-2 border-amber-400 order-1 md:order-2",
                "p-1"
            )}>
                <div className="min-h-[300px] h-full relative">
                    <Image src={cover} alt={title} fill style={{ objectFit: "cover" }} />
                </div>
            </div>
        </section>
    )
}