import { getBlogImageUrl } from "@/utils/blogs";
import Image from "next/image";

export default function BlogHero({ data }: { data: any }) {
  const url = getBlogImageUrl(data);
  if (!data) return <div>Unable to get data from the server</div>;
  return (
    <section className="w-full h-[800px]">
      <div className="h-[800px] relative border-2 border-amber-400 p-2">
        <div>
          <Image
            src={url}
            alt={data?.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}
