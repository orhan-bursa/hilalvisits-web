import "server-only";
import { Client } from "@notionhq/client";
import { array } from ".";
import { BlogPageObject, PhotoPageObject, MenuPageObject } from "@/types";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { InfoPageObject } from "@/types/page";

const notionClient = new Client({
  auth: process.env.NOTION_SECRET,
});

export async function getBlogs(filter?: { menu_slug?: string }) {
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

export async function getMenus(depth?: number) {
  try {
    if (!depth) {
      const res = await notionClient.databases.query({
        database_id: process.env.NOTION_MENUS_DATABASE_ID!,
      });

      const menus = array<MenuPageObject>(res?.results)
      return menus;
    }
    else {
      const filter = {
        property: "depth",
        formula: {
          number: {
            equals: depth
          }
        }
      }
      const res = await notionClient.databases.query({
        database_id: process.env.NOTION_MENUS_DATABASE_ID!,
        filter
      });

      const menus = array<MenuPageObject>(res?.results)
      return menus;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function getMenuBySlug(slug: string) {
  const filter = {
    property: "slug",
    rich_text: {
      equals: slug!
    }
  }
  try {
    const res = await notionClient.databases.query({
      database_id: process.env.NOTION_MENUS_DATABASE_ID!,
      filter
    });

    const menu = array<MenuPageObject>(res?.results)[0]
    return menu;
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

export async function getInfoPages() {
  try {
    const res = await notionClient.databases.query({
      database_id: process.env.NOTION_PAGES_DATABASE_ID!
    });

    const photos = array<InfoPageObject>(res?.results)
    return photos;
  } catch (error) {
    console.log(error);
  }
};
export async function getInfoPageBySlug(slug: string) {
  const filter = {
    property: "slug",
    rich_text: {
      equals: slug!
    }
  }
  try {
    const res = await notionClient.databases.query({
      database_id: process.env.NOTION_PAGES_DATABASE_ID!,
      filter
    });

    const photos = array<InfoPageObject>(res?.results)
    return photos.length ? photos[0] : undefined
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