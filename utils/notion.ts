import "server-only";
import { Client } from "@notionhq/client";
import { albumMapper, blogMapper, photoMapper } from "./mapper";
import array from "./array";

export const notionClient = new Client({
  auth: process.env.NOTION_SECRET,
});

export const getBlogs = async () => {
  try {
    const res = await notionClient.databases.query({
      //TODO: get only published items
      database_id: process.env.NOTION_BLOGS_DATABASE_ID!,
    });

    const blogs = blogMapper(array(res?.results))
    return blogs;
  } catch (error) {
    console.log(error);
  }
};

export const getHomePage = async () => {
  try {
    //TODO: get limited number of items from each section
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

export const getPhotos = async () => {
  try {
    const res = await notionClient.databases.query({
      //TODO: get only published items
      database_id: process.env.NOTION_PHOTOS_DATABASE_ID!,
    });

    const photos = photoMapper(array(res?.results))
    return photos;
  } catch (error) {
    console.log(error);
  }
};

export const getAlbums = async () => {
  try {
    const res = await notionClient.databases.query({
      //TODO: get only published items
      database_id: process.env.NOTION_ALBUMS_DATABASE_ID!,
    });

    const albums = albumMapper(array(res?.results))
    return albums;
  } catch (error) {
    console.log(error);
  }
};

const getPageContent = async (pageId: string) => {
  try {
    const response = await notionClient.blocks.children.list({
      block_id: pageId,
    });
    return response.results;
  } catch (error) {
    console.log(error);
  }
};

export const getBlogsContent = async (pageIds: string[]) => {
  try {
    const blogsContent = await Promise.all(
      pageIds.map((id) => getPageContent(id))
    );
    return blogsContent;
  } catch (error) {
    console.log(error);
  }
};
