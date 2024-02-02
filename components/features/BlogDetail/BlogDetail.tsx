import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import {
  BlogDetailHero,
  BlogDetailContent,
  BlogDetailSideContent
} from "./sections";
import cn from "classnames";
import { BlogPageObject, AlbumPageObject } from "@/types";

interface IPropTypes {
  blog: BlogPageObject
  blogContents: BlockObjectResponse[]
  albums: AlbumPageObject[],
}

export default function BlogDetail({ data }: { data: IPropTypes }) {
  const { blog, blogContents, albums } = data

  return <div className="w-full">
    <div className="md:col-span-4">
      <BlogDetailHero data={blog} />
    </div>
    <div className={cn(
      "mx-auto w-full",
      "md:grid md:grid-cols-4 md:max-w-[1200px]",
    )}
    >
      <div className="md:col-span-3">
        <BlogDetailContent />
      </div>
      <div className="md:col-span-1">
        <BlogDetailSideContent albums={albums} />
      </div>
    </div>
  </div>;
}
