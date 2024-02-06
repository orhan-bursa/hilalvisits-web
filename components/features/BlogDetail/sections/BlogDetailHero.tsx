import { BlogPageObject } from "@/types";
import { destructureBlogProps } from "@/utils";
import { whisper } from "@/utils/fonts";
import { Chip } from "@mui/material";
import cn from "classnames";
import Image from "next/image";

export default function BlogDetailHero({ data }: { data: BlogPageObject }) {
    const { title, cover, description } = destructureBlogProps(data)

    return (
        <section className="w-full h-full min-h-[600px] md:max-w-[1200px]">
            <div className="w-full">
                <div className="min-h-[600px] h-full relative">
                    <Image src={cover} alt={title} fill style={{ objectFit: "cover" }} />
                </div>
            </div>
            <div className={cn(
                "w-full px-4 py-2",
            )}>
                <h1 className={cn(
                    whisper.className,
                    " ",
                    "text-amber-400 underline underline-offset-8 mb-4 pl-4 text-center",
                    "text-5xl sm:text-6xl md:text-7xl lg:text-8xl",

                )}>
                    {title}
                </h1>
                <p className="italic md:max-w-[900px]">
                    {description}
                </p>
            </div>

        </section>
    )
}