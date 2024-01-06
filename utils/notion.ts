import "server-only";
import { Client } from "@notionhq/client";
import { albumMapper, blogMapper, photoMapper } from "./mapper";
import { array } from ".";
import type { BlockObjectResponse, GetPageResponse, ListBlockChildrenResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const notionClient = new Client({
  auth: process.env.NOTION_SECRET,
});

const publishedStatusFilter = {
  property: "status",
  status: {
    equals: "published"
  }
}
export async function getBlogs() {
  try {
    const res = await notionClient.databases.query({
      database_id: process.env.NOTION_BLOGS_DATABASE_ID!,
      filter: publishedStatusFilter
    });

    const blogs = blogMapper(array(res?.results))
    return blogs;
  } catch (error) {
    console.log(error);
  }
};

export async function getHomePage() {
  try {
    //TODO: create homepage fetch function

    return {};
  } catch (error) {
    console.log(error);
  }
};

export async function getPhotos() {
  try {
    const res = await notionClient.databases.query({
      database_id: process.env.NOTION_PHOTOS_DATABASE_ID!,
      filter: publishedStatusFilter
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
      filter: publishedStatusFilter
    });

    return res?.results;
  } catch (error) {
    console.log(error);
  }
};

export async function getPageContents(pageId: string) {
  try {
    const response = await notionClient.blocks.children.list({
      block_id: pageId,
    });
    return response.results
  } catch (error) {
    console.log(error);
  }
};

export async function getPage(id: string) {
  try {
    const res = await notionClient.pages.retrieve({ page_id: id })
    return res as PageObjectResponse
  } catch (error) {
    console.log(error);
  }
}