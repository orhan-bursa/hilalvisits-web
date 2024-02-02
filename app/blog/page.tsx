import { Blogs as FeatureBlogs } from "@/components/features";
import { getBlogs } from "@/utils/notion";
import { Alert } from "@mui/material";

export default async function Blog() {
  const blogs = await getBlogs();

  if (!blogs) return <Alert severity="warning">No Blogs Found</Alert>;

  return <FeatureBlogs blogs={blogs} />;
}
