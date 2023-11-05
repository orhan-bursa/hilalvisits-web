import {
  NOTION_ALBUMS_DATABASE_ID,
  NOTION_BLOGS_DATABASE_ID,
  NOTION_PHOTOS_DATABASE_ID,
  NOTION_SECRET,
} from "@/env";
import { Client } from "@notionhq/client";
import type { NextApiRequest, NextApiResponse } from "next";

const secret = NOTION_SECRET;
const blogsDatabaseId = NOTION_BLOGS_DATABASE_ID;
const albumsDatabaseId = NOTION_ALBUMS_DATABASE_ID;
const photosDatabaseId = NOTION_PHOTOS_DATABASE_ID;

const notion = new Client({ auth: secret });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!notion || !blogsDatabaseId || albumsDatabaseId || photosDatabaseId)
    throw new Error("Missing notion secret or databaseId");

  const blogsQuery = await notion.databases.query({
    database_id: blogsDatabaseId,
  });

  console.log(blogsQuery.results);

  res.status(200).json({
    secret,
    blogsDatabaseId,
    albumsDatabaseId,
    photosDatabaseId,
  });
}
