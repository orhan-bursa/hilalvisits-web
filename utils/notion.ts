import "server-only";
import { Client } from "@notionhq/client";
import { array } from ".";
import { BlogPageObject, PhotoPageObject, AlbumPageObject, MenuPageObject } from "@/types";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type BlogsFilterQuery = {
  menu_slug?: string;
}

export const notionClient = new Client({
  auth: process.env.NOTION_SECRET,
});

export async function getBlogs(filter?: BlogsFilterQuery) {

  const filterQuery: any[] = [{
    property: "status",
    status: {
      equals: "published"
    }
  }]

  if (filter) filterQuery.push({
    property: "menu_path",
    rollup: {
      any: {
        rich_text: {
          contains: filter.menu_slug
        }
      }
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

export async function getMenus({ depth }: { depth: number }) {
  const filter = {
    property: "depth",
    formula: {
      number: {
        equals: depth
      }
    }
  }

  try {
    const res = await notionClient.databases.query({
      database_id: process.env.NOTION_MENUS_DATABASE_ID!,
      filter
    });

    const menus = array<MenuPageObject>(res?.results)
    return menus;
  } catch (error) {
    console.log(error);
  }
}

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

export async function getBlockChildren(id: string) {
  try {
    const response = await notionClient.blocks.children.list({
      block_id: id,
    });
    return response?.results as BlockObjectResponse[]
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

export async function getBlogBySlug(slug: string) {
  try {
    const res = await notionClient.databases.query({
      database_id: process.env.NOTION_BLOGS_DATABASE_ID!,
      filter: {
        and: [
          {
            property: "status",
            status: {
              equals: "published"
            }
          },
          {
            property: "slug",
            rich_text: {
              equals: slug
            }
          }
        ]
      }
    })

    const blogs = array<BlogPageObject>(res?.results)

    return blogs.length ? blogs[0] : undefined
  } catch (error) {
    console.log(error);
  }
}

export async function retrieveDatabase(database_id: string) {
  const res = await notionClient.databases.retrieve({ database_id });
  return res
}