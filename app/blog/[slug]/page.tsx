import { BlogDetail as FeatureBlogDetail } from "@/components"
import { getPage, getPageContents, getAlbums } from "@/utils/notion";
import { BlockObjectResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { notFound } from "next/navigation";
import { array } from "@/utils";
import { BlogPageObject, AlbumPageObject } from "@/types";

export default async function BlogDetail({ params }: { params: { slug: string } }) {
  //TODO: get blog data using slug not id
  const id = params.slug

  const blogResponse = await getPage(id)
  const blogContentsResponse = await getPageContents(id as string)
  const albumsResponse = await getAlbums()

  const blog = blogResponse as BlogPageObject
  const blogContents = array<BlockObjectResponse>(blogContentsResponse)
  const albums = array<AlbumPageObject>(albumsResponse)

  const data = {
    blog,
    blogContents,
    albums,
  }

  if (!blog) return notFound();

  return <FeatureBlogDetail data={data} />;
}
