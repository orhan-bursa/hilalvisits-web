import { BlogDetail as FeatureBlogDetail } from "@/components"
import { getBlockChildren, getBlogBySlug } from "@/utils/notion";
import { notFound } from "next/navigation";

export default async function BlogDetail({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const blog = await getBlogBySlug(slug)

  if (!blog) return notFound();
  const blogContents = await getBlockChildren(blog.id)

  return (
    <FeatureBlogDetail
      blog={blog}
      blogContents={blogContents}
    />
  )
}
