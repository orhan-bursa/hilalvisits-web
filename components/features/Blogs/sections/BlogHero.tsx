import { getBlogImageUrl } from "@/utils/blogs";
import { babylonica, montserrat, whisper } from "@/utils/fonts";
import { Button } from "@mui/material";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

export default function BlogHero({ data }: { data: any }) {
  const url = getBlogImageUrl(data);
  const title = data?.title?.title[0].plain_text;
  console.log(data);

  if (!data) return <div>Unable to get data from the server</div>;
  return (
    <section className="w-full h-full min-h-[600px] flex flex-col md:flex-row mt-2 md:p-8">
      <div className={cn(
        "w-full md:w-[40%] order-2 md:order-1",
        "px-4 py-2",
      )}>
        <h1 className={cn(
          whisper.className,
          " ",
          "text-amber-400 underline underline-offset-8 mb-4 pl-4",
          "text-5xl sm:text-6xl md:text-7xl lg:text-8xl",

        )}>
          {title}
        </h1>
        <h3
          className={cn(
            "text-md sm:text-lg md:text-xl",
            "mb-2 text-gray-500 italic"
          )}
        >Latest Blog</h3>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non
          asperiores officia officiis aliquam nostrum distinctio dolores
          explicabo excepturi, mollitia illum!
        </p>
        <div className="flex md:flex-col items-center justify-between md:items-start">
          <Button
            LinkComponent={Link}
            href="/"
            variant="text"
            color="inherit"
            sx={{
              width: 128,
              marginY: 2,
              border: "2px solid white",
              borderBottom: "2px solid #e2e8f0",
              textTransform: "none",
              fontFamily: montserrat.className,
              fontSize: 18,
              transition: "all 500ms ease",
              "&:hover": {
                border: "2px solid #94a3b8"
              }
            }}
          >
            Read more
          </Button>
        </div>
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
