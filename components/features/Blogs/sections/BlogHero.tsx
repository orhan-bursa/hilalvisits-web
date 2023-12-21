import { getBlogImageUrl } from "@/utils/blogs";
import cn from "classnames";
import Image from "next/image";

export default function BlogHero({ data }: { data: any }) {
  const url = getBlogImageUrl(data);
  const title = data?.title?.title[0].plain_text;
  console.log(data);

  if (!data) return <div>Unable to get data from the server</div>;
  return (
    <section className="w-full h-[700px]">
      <div className="h-[700px] relative border-2 border-amber-400">
        <div>
          <Image src={url} alt={title} fill style={{ objectFit: "cover" }} />
        </div>
        <div className="absolute bottom-10 text-white lg:px-12 bg-black bg-opacity-40">
          <h1 className={cn("text-4xl font-semibold mb-4 lg:mb-6")}>
            {title.toLocaleUpperCase("tr-TR")}
          </h1>
          <p className="text-2xl">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non
            asperiores officia officiis aliquam nostrum distinctio dolores
            explicabo excepturi, mollitia illum!
          </p>
        </div>
      </div>
    </section>
  );
}
