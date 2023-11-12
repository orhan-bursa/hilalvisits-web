import { Blogs as FeatureBlogs } from "@/components/features";
import { BlogResult } from "@/types/blog";
import { getBlogs, getBlogsContent } from "@/utils/notion";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export default async function Blog() {
  const posts: (
    | DatabaseObjectResponse
    | PageObjectResponse
    | PartialPageObjectResponse
    | PartialDatabaseObjectResponse
  )[] = await getBlogs();
  const idList = posts.map((post) => post.id);

  const postContents = await getBlogsContent(idList);

  if (!posts) return <div>No Posts found.</div>;

  return <FeatureBlogs data={postContents} />;
}
