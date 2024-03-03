"use client";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import { BlogPageObject } from "@/types";
import { destructureBlogProps } from "@/utils";
import { Alert, Button, Chip } from "@mui/material";

export default function HomeLatestBlogs({ items }: { items: BlogPageObject[] | undefined }) {

  if (!items || !items.length) return <Alert>Unable to retrieve data from server</Alert>
  return (
    <section className="max-w-[900px] w-full mx-auto">
      <h2 className={cn(
        "w-full cursor-default mb-6",
        "text-4xl md:text-5xl font-semibold text-center",
      )}>
        En Yeniler
      </h2>
      <div className="w-full flex flex-col gap-8 px-4 lg:px-0">
        {items.map(blog => {
          const { title, description, cover, slug, categories } = destructureBlogProps(blog)
          return (
            <div key={blog.id} className="flex flex-col sm:flex-row gap-4 lg:gap-6">
              <div className="relative h-[300px] sm:h-[200px] aspect-square ">
                <Link href={`/blog/${slug}`}>
                  <Image
                    src={cover ?? ""}
                    alt={title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Link>
              </div>
              <div>
                <Link href={`/blog/${slug}`}>
                  <h3 className="text-3xl font-bold cursor-pointer hover:text-red-500 mb-3">{title}</h3>
                </Link>
                <div className="flex flex-wrap gap-2 mb-2">
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
                <p>{description}</p>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mb-2 mt-4 space-y-2 text-center">
        <Button
          variant="outlined"
          color="inherit"
          LinkComponent={Link}
          href="/blog"
          className="hover:bg-transparent text-black"
        >
          Tümünü Gör
        </Button>
      </div>
    </section>
  );
}
