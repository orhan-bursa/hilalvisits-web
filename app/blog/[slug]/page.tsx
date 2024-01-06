import { BlogDetail as FeatureBlogDetail } from "@/components"
import { getPage, getPageContents, getAlbums } from "@/utils/notion";
import { BlockObjectResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { notFound } from "next/navigation";
import { array } from "@/utils";

export default async function BlogDetail({ params }: { params: { slug: string } }) {
  const id = params.slug

  const blogResponse = await getPage(id as string)
  const albumsResponse = await getAlbums()
  const blogContentsResponse = await getPageContents(id as string)

  const blog = blogResponse as PageObjectResponse
  const albums = array<PageObjectResponse>(albumsResponse)
  const blogContents = array<BlockObjectResponse>(blogContentsResponse)

  const data = {
    blog,
    blogContents,
    albums,
  }

  if (!blog) return notFound();

  return <FeatureBlogDetail data={data} />;
}
