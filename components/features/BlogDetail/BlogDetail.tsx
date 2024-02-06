import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import {
  BlogDetailHero,
  BlogDetailContent,
} from "./sections";
import { BlogPageObject } from "@/types";

interface IPropTypes {
  blog: BlogPageObject
  blogContents?: BlockObjectResponse[]
}

export default function BlogDetail({ blog, blogContents }: IPropTypes) {

  return (
    <div className="w-full flex flex-col items-center">
      <BlogDetailHero data={blog} />
      <BlogDetailContent blogContents={blogContents} />
    </div>
  )
}
