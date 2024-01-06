import { Blogs as FeatureBlogs } from "@/components/features";
import { getBlogs } from "@/utils/notion";

export default async function Blog() {
  const blogs: any = await getBlogs();

  if (!blogs) return <div>No Blogs found.</div>;

  return <FeatureBlogs blogs={blogs} />;
}
