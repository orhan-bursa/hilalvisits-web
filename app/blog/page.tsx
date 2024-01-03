import { Blogs as FeatureBlogs } from "@/components/features";
import { getBlogs, getBlogsContent } from "@/utils/notion";

export default async function Blog() {
  const blogs: any = await getBlogs();

  // const idList = blogs.map((blog: any) => blog.id);
  // const blogContents = await getBlogsContent(idList);

  if (!blogs) return <div>No Blogs found.</div>;

  return <FeatureBlogs blogs={blogs} />;
}
