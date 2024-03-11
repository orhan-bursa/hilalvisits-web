import { BlogPageObject } from "@/types";
import { destructureBlogProps } from "@/utils";
import { Chip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function CategoryBlogs({ items }: { items: BlogPageObject[] }) {
    return (
        <section className="max-w-[1200px] w-full mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                {items.map(blog => {
                    const { cover, title, description, slug, categories } = destructureBlogProps(blog)
                    return (
                        <div className="col-span-1">
                            <Link href={`/blog/${slug}`}>
                                <div className="relative w-full aspect-[3/2] cursor-pointer mb-3">
                                    <Image
                                        src={cover ?? ""}
                                        alt={title}
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>
                                <h3 className="text-3xl font-bold cursor-pointer hover:text-red-500 mb-3">{title}</h3>
                            </Link>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {categories.map(c => (
                                    <Link key={c.title} href={`/${c.href}`}>
                                        <Chip
                                            key={c.title}
                                            label={c.title}
                                            variant="outlined"
                                            size="small"
                                            className="cursor-pointer rounded border-stone-400 hover:border-black hover:bg-stone-100"
                                        />
                                    </Link>
                                ))}
                            </div>
                            <p>{description}</p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}