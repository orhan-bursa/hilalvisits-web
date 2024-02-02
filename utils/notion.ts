import "server-only";
import { Client } from "@notionhq/client";
import { array } from ".";
import { BlogPageObject, PhotoPageObject, AlbumPageObject } from "@/types";

export const notionClient = new Client({
  auth: process.env.NOTION_SECRET,
});

export async function getBlogs(filter?: { country?: string }) {

  const filterQuery: any[] = [
    {
      property: "status",
      status: {
        equals: "published"
      }
    },
  ]

  if (!!filter?.country)
    filterQuery.push({
      property: "country",
      multi_select: {
        contains: filter.country
      }
    })

  try {
    const res = await notionClient.databases.query({
      database_id: process.env.NOTION_BLOGS_DATABASE_ID!,
      filter: {
        and: filterQuery
      }
    });

    const blogs = array<BlogPageObject>(res?.results)
    return blogs;
  } catch (error) {
    console.log(error);
  }
};

export async function getPhotos() {
  try {
    const res = await notionClient.databases.query({
      database_id: process.env.NOTION_PHOTOS_DATABASE_ID!,
      filter: {
        property: "status",
        status: {
          equals: "published"
        }
      }
    });

    const photos = array<PhotoPageObject>(res?.results)
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
      filter: {
        property: "status",
        status: {
          equals: "published"
        }
      }
    });

    const albums = array<AlbumPageObject>(res?.results)
    return albums;
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
    return res
  } catch (error) {
    console.log(error);
  }
}