import { getBlogImageUrl } from "@/utils/blogs";
import { whisper } from "@/utils/fonts";
import cn from "classnames";
import Image from "next/image";

export default function BlogGrid({ data }: { data: any }) {
  return (
    <section className="max-w-[1200px] w-full min-h-[600px] h-full mx-auto">
      <div className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-0">
        <div>
          <h2
            className={cn(
              whisper.className,
              "w-full text-amber-400 tracking-wider mb-2 cursor-default",
              "text-[60px] sm:text-[60px] text-center sm:text-center"
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
          {data.map((blog: any, i: number) => {
            const url = getBlogImageUrl(blog);
            return (
              <div key={blog.title?.title?.[0].plain_text}>
                <div className="w-full h-full relative min-h-[300px]">
                  <Image
                    src={url}
                    alt={data?.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute bottom-5 px-2 lg:px-4 text-white">
                    <h3 className="text-xl">Lorem ipsum dolor sit amet.</h3>
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
