import { BlogPageObject } from "@/types";
import { destructureBlogProps } from "@/utils";
import { whisper } from "@/utils/fonts";
import cn from "classnames";
import Image from "next/image";

export default function BlogDetailHero({ data }: { data: BlogPageObject }) {
    const { title, cover, description } = destructureBlogProps(data)

    return (
        <section className="w-full h-full min-h-[600px] md:max-w-[1200px] space-y-3">
            <div className="min-w-[500px] w-full aspect-video relative">
                <Image src={cover} alt={title} fill style={{ objectFit: "cover" }} />
            </div>
            <h1 className={cn(
                "text-amber-400 text-center px-4 xl:px-0 font-semibold max-w-[1050px] mx-auto",
                "text-5xl sm:text-6xl md:text-7xl",
            )}>
                {title}
            </h1>
            <p className="italic max-w-[900px] mx-auto px-4 xl:px-0">
                {description}
            </p>
        </section>
    )
}