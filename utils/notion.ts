import "server-only";
import { Client } from "@notionhq/client";
import { array } from ".";
import { BlogPageObject, PhotoPageObject, AlbumPageObject } from "@/types";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type BlogsFilterQuery = {
  parentCategoryKey?: string
  categoryKey?: string
  subCategoryKey?: string
}

export const notionClient = new Client({
  auth: process.env.NOTION_SECRET,
});

export async function getBlogs(filter?: BlogsFilterQuery) {

  const filterQuery: any[] = [
    {
      property: "status",
      status: {
        equals: "published"
      }
    },
  ]

  if (!!filter?.parentCategoryKey) {
    filterQuery.push({
      property: "parent_category_key",
      select: {
        equals: filter.parentCategoryKey
      }
    })
  }
  if (!!filter?.categoryKey) {
    filterQuery.push({
      property: "category_key",
      select: {
        equals: filter.categoryKey
      }
    })
  }
  if (!!filter?.subCategoryKey) {
    filterQuery.push({
      property: "sub_category_key",
      select: {
        equals: filter.subCategoryKey
      }
    })
  }

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