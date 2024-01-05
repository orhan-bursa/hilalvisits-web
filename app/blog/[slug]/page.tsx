import { getPage, getPageContent, notionClient } from "@/utils/notion";
import { BlogDetail as FeatureBlogDetail } from "@/components"
import { notFound } from "next/navigation";

export default async function BlogDetail({ params }: { params: { slug: string } }) {
  //TODO: query using slug instead of id
  const id = params.slug;
  const blog = await getPage(id)
  if (!blog) return notFound();

  const content = await getPageContent(id)
  return <FeatureBlogDetail data={content} />;
}
