import { getBlogImageUrl } from "@/utils/blogs";
import { babylonica, whisper } from "@/utils/fonts";
import cn from "classnames";
import Image from "next/image";

export default function BlogHero({ data }: { data: any }) {
  const url = getBlogImageUrl(data);
  const title = data?.title?.title[0].plain_text;
  console.log(data);

  if (!data) return <div>Unable to get data from the server</div>;
  return (
    <section className="w-full h-full min-h-[600px] flex flex-col md:flex-row mt-2">
      <div className={cn(
        "w-full md:w-[40%] order-2 md:order-1",
        "px-4 py-2"
      )}>
        <h3
          className={cn(
            whisper.className,
            " ",
            "text-3xl sm:text-4xl md:text-5xl",
            "mb-2 text-gray-500"
          )}
        >Latest Travel Blog</h3>
        <h1 className={cn(
          whisper.className,
          " ",
          "text-amber-400 mb-4 pl-4",
          "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
        )}>
          {title}
        </h1>
        <p className="text-2xl">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non
          asperiores officia officiis aliquam nostrum distinctio dolores
          explicabo excepturi, mollitia illum!
        </p>
      </div>
      <div className={cn(
        "w-full md:w-[60%] border-2 border-amber-400 order-1 md:order-2",
        "p-1"
      )}>
        <div className="min-h-[300px] h-full relative">
          <Image src={url} alt={title} fill style={{ objectFit: "cover" }} />
        </div>
      </div>
    </section>
  );
}
