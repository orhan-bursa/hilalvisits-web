import "server-only";
import { Client } from "@notionhq/client";
import { albumMapper, blogMapper, photoMapper } from "./mapper";
import array from "./array";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const notionClient = new Client({
  auth: process.env.NOTION_SECRET,
});

const publishedStatusQuery = {
  property: "status",
  status: {
    equals: "published"
  }
}
export async function getBlogs() {
  try {
    const res = await notionClient.databases.query({
      database_id: process.env.NOTION_BLOGS_DATABASE_ID!,
      filter: publishedStatusQuery
    });

    const blogs = blogMapper(array(res?.results))
    return blogs;
  } catch (error) {
    console.log(error);
  }
};

export async function getHomePage() {
  try {
    const blogs = await getBlogs();
    const photos = await getPhotos();

    return {
      blogs,
      photos,
    };
  } catch (error) {
    console.log(error);
  }
};

export async function getPhotos() {
  try {
    const res = await notionClient.databases.query({
      database_id: process.env.NOTION_PHOTOS_DATABASE_ID!,
      filter: publishedStatusQuery
    });

    const photos = photoMapper(array(res?.results))
    return photos;
  } catch (error) {
    console.log(error);
  }
};

export async function getAlbums() {
  try {
    const res = await notionClient.databases.query({
      //TODO: get only published items
      database_id: process.env.NOTION_ALBUMS_DATABASE_ID!,
      filter: publishedStatusQuery
    });

    const albums = albumMapper(array(res?.results))
    return albums;
  } catch (error) {
    console.log(error);
  }
};


export async function getBlogsContent(pageIds: string[]) {
  try {
    const blogsContent = await Promise.all(
      pageIds.map((id) => getPageContent(id))
    );
    return blogsContent;
  } catch (error) {
    console.log(error);
  }
};

export async function getPageContent(pageId: string) {
  try {
    const response = await notionClient.blocks.children.list({
      block_id: pageId,
    });
    return response.results as BlockObjectResponse[];
  } catch (error) {
    console.log(error);
  }
};

export async function getPage(id: string) {
  try {
    const res = notionClient.pages.retrieve({ page_id: id })
    return res
  } catch (error) {
    console.log(error);
  }
}