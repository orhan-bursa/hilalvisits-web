"use client";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import { CustomButton } from "@/components/shared/custom";
import { BlogPageObject } from "@/types";
import { destructureBlogProps } from "@/utils";
import { Alert, Chip } from "@mui/material";

export default function HomeLatestBlogs({ items }: { items: BlogPageObject[] | undefined }) {

  if (!items || !items.length) return <Alert>Unable to retrieve data from server</Alert>
  return (
    <section className="max-w-[900px] w-full mx-auto">
      <h2 className={cn(
        "w-full cursor-default mb-6",
        "text-5xl font-[500] text-center"
      )}>
        Latest Blogs
      </h2>
      <div className={cn(
        "w-full",
        "flex flex-col gap-8"
      )}>
        {items.map(blog => {
          const { title, description, cover, slug, categories } = destructureBlogProps(blog)
          return (
            <div key={blog.id} className="flex flex-col sm:flex-row gap-6">
              <div className="relative h-[300px] sm:h-[200px] aspect-square">
                <Image
                  src={cover ?? ""}
                  alt={title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <Link href={`/blog/${slug}`}>
                  <h3 className="text-2xl font-[500]">{title}</h3>
                </Link>
                <p>{description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {categories.map(c => (
                    <Link key={c.title} href={c.href}>
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
              </div>
            </div>
          )
        })}
      </div>
      <div className="mb-2 mt-4 space-y-2 text-center">
        <CustomButton
          href="/blog"
          LinkComponent={Link}
          color="gray"
        >
          See All Blogs
        </CustomButton>
      </div>
    </section>
  );
}
