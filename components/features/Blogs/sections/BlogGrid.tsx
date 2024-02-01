import { BlogPageObject } from "@/types";
import { destructureBlogProps } from "@/utils";
import { whisper } from "@/utils/fonts";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

export default function BlogGrid({ items }: { items: BlogPageObject[] }) {
  return (
    <section className="max-w-[1200px] w-full min-h-[600px] h-full mx-auto">
      <div className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-0">
        <div>
          <h2
            className={cn(
              whisper.className,
              "w-full text-amber-400 tracking-wider mb-2 cursor-default",
              "text-[60px] sm:text-[80px] text-center sm:text-center"
            )}
          >
            Blogs
          </h2>
        </div>
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
            "gap-2 sm:gap-4 md:gap:6",
            "w-full h-full"
          )}
        >
          {items.map((blog, i: number) => {
            const { cover, title } = destructureBlogProps(blog)
            return (
              <div
                key={title}
                className="cursor-pointer"
              >
                <div className="w-full h-full relative">
                  <div className="w-full h-full relative min-h-[300px]">
                    <Link href={`/blog/${blog?.id}`}>
                      <Image
                        src={cover}
                        alt={title}
                        fill
                        style={{ objectFit: "cover" }}
                      // className="hover:scale-110 transition-all duration-700"
                      />
                    </Link>
                  </div>
                  <div className="absolute bottom-5 px-2 lg:px-4 text-white">
                    <h3 className="text-xl">{title}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
