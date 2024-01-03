import { getPage } from "@/utils/notion";
import { BlogDetail as FeatureBlogDetail } from "@/components"
import { notFound } from "next/navigation";

export default async function BlogDetail({ params }: { params: { slug: string } }) {
  //TODO: query using slug instead of id
  const id = params.slug;
  const blog = await getPage(id)
  if (!blog) return notFound();

  return <FeatureBlogDetail data={blog} />;
}
