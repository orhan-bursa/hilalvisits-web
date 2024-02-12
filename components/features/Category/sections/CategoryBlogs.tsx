import { BlogPageObject } from "@/types";
import { destructureBlogProps } from "@/utils";
import { Chip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function CategoryBlogs({ items }: { items: BlogPageObject[] }) {
    return (
        <section className="max-w-[1200px] w-full mx-auto">
            <div className="grid grid-cols-3 gap-3 md:gap-6">
                {items.map(blog => {
                    const { cover, title, parent_category, category, parent_category_key, category_key, description, slug } = destructureBlogProps(blog)
                    return <div className="col-span-3 md:col-span-1">
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
                            {[
                                { label: parent_category, href: `/${parent_category_key}` },
                                { label: category, href: `/${parent_category_key}/${category_key}` },
                            ].map(tag => (
                                <Link href={tag.href} key={tag.label}>
                                    <Chip
                                        key={tag.label}
                                        label={tag.label}
                                        variant="outlined"
                                        size="small"
                                        className="cursor-pointer rounded border-stone-400 hover:border-black hover:bg-stone-100"
                                    />
                                </Link>
                            ))}
                        </div>
                        <p>{description}</p>
                    </div>
                })}
            </div>
        </section>
    )
}