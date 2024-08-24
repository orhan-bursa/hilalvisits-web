import { BlogPageObject } from "@/types";
import { destructureBlogProps } from "@/utils";
import { Button, Chip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function HomeFavorites({ items }: { items?: BlogPageObject[] }) {
  return (
    <div className="w-full md:w-1/2 space-y-6">
      <h2 className="w-full cursor-default text-4xl font-semibold text-center md:text-start">
        Favoriler
      </h2>
      {items?.map(blog => {
        const { title, cover, slug, categories } = destructureBlogProps(blog)
        return (
          <div key={blog.id} className="flex flex-row items-center gap-4 lg:gap-6">
            <div className="relative h-[120px] sm:h-[90px] aspect-[4/3]">
              <Link href={`/blog/${slug}`}>
                <Image
                  src={cover ?? ""}
                  alt={title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes={`
                    (max-width: 640px) 160px, 
                    120px
                    `}
                />
              </Link>
            </div>
            <div>
              <Link href={`/blog/${slug}`}>
                <h3 className="text-2xl md:text-2xl font-semibold cursor-pointer hover:text-red-500 mb-3">{title}</h3>
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
            </div>
          </div>
        )
      })}
      <div className="text-center">
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
    </div>
  )
}
