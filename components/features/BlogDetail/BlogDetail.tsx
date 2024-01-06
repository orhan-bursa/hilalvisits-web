import { BlockObjectResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import {
  BlogDetailHero as Hero,
  BlogDetailContent as Content,
  BlogDetailSideContent as SideContent
} from "./sections";
import cn from "classnames";

type BlogDetailData = {
  blog: PageObjectResponse
  blogContents: BlockObjectResponse[]
  albums: PageObjectResponse[],
}
export default function BlogDetail({ data }: { data: BlogDetailData }) {
  const { blog, blogContents, albums } = data

  return <div className={cn(
    "mx-auto w-full max-w-[1200px]",
    "md:grid md:grid-cols-4"
  )}>
    <div className="md:col-span-4">
      <Hero />
    </div>
    <div className="md:col-span-3">
      <Content />
    </div>
    <div className="md:col-span-1">
      <SideContent albums={albums} />
    </div>
  </div>;
}
