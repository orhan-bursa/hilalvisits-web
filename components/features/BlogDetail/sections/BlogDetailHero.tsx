import { BlogPageObject } from "@/types";
import { destructureBlogProps } from "@/utils";
import cn from "classnames";
import Image from "next/image";

export default function BlogDetailHero({ data }: { data: BlogPageObject }) {
    const { title, cover, description } = destructureBlogProps(data)

    return (
        <section className="w-full h-max min-h-[500px] md:max-w-[1200px] space-y-3">
            <div className="min-w-[500px] h-[540px] w-full aspect-video relative">
                <Image
                    src={cover}
                    alt={title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes={`
                        (max-width: 1200px) 100vw,
                        1200px
                        `}
                />
            </div>
            <h1 className={cn(
                "text-center px-4 xl:px-0 font-semibold max-w-[1050px] mx-auto",
                "text-4xl sm:text-5xl md:text-[54px] py-2",
            )}>
                {title}
            </h1>
            <p className="italic max-w-[900px] mx-auto px-4 xl:px-0 text-lg">
                {description}
            </p>
        </section>
    )
}