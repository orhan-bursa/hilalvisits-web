"use client";
import { PhotoPageObject } from "@/types";
import { destructurePhotoProps } from "@/utils";
import { Alert } from "@mui/material";
import cn from "classnames";
import Image from "next/image";

export default function PhotoGrid({ items }: { items: PhotoPageObject[] | undefined }) {

    if (!items || !items.length) return <Alert>Unable to retrieve data from server</Alert>

    return (
        <section className="cursor-default mx-auto max-w-[1400px] px-4">
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-0">
                {items.map((p, i) => {
                    const { image, title } = destructurePhotoProps(p)
                    return (
                        <div className={cn(
                            "w-full h-full flex justify-center items-center px-1 py-1",
                            "hover:opacity-90 cursor-pointer duration-300 group overflow-hidden",
                            // { "pt-2": i === 0, "pt-2": i !== 0 }
                        )}>
                            <Image
                                src={image}
                                alt={title}
                                width={300}
                                height={700}
                                objectFit="cover"
                                className="w-full h-auto rounded"
                            />
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
