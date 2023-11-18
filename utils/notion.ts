import "server-only";
import { Client } from "@notionhq/client";

export const notionClient = new Client({
  auth: process.env.NOTION_SECRET,
});

export const getBlogs = async () => {
  const res = await notionClient.databases.query({
    //TODO: get only published items
    database_id: process.env.NOTION_BLOGS_DATABASE_ID!,
  });

  return res?.results;
};

export const getHomePage = async () => {
  //TODO: get limited number of items from each section
  const blogs = await getBlogs();
  const photos = await getPhotos();
  // const albums = await getAlbums()

  //TODO: add mapper
  return {
    blogs,
    photos,
  };
};

export const getPhotos = async () => {
  const res = await notionClient.databases.query({
    //TODO: get only published items
    database_id: process.env.NOTION_PHOTOS_DATABASE_ID!,
  });

  return res?.results;
};

export const getAlbums = async () => {
  const res = await notionClient.databases.query({
    //TODO: get only published items
    database_id: process.env.NOTION_ALBUMS_DATABASE_ID!,
  });

  return res?.results;
};

const getPageContent = async (pageId: string) => {
  const response = await notionClient.blocks.children.list({
    block_id: pageId,
  });
  return response.results;
};

export const getBlogsContent = async (pageIds: string[]) => {
  const blogsContent = await Promise.all(
    pageIds.map((id) => getPageContent(id))
  );
  return blogsContent;
};
