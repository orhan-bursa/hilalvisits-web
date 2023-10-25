"use client";
import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { getBlogPosts } from "@/api/notion-api";
import { Client, APIErrorCode } from "@notionhq/client";
import { NOTION_BLOGS_DB, NOTION_KEY } from "@/env";

interface Props {
  posts: any;
}
export default function Home() {
  const fetch = async () => {
    try {
      const notion = new Client({ auth: NOTION_KEY });
      const blogsResponse = await notion.databases.query({
        database_id: NOTION_BLOGS_DB ?? "",
      });
      console.log({ blogsResponse });
    } catch (error: any) {
      if (error.code === APIErrorCode.ObjectNotFound) {
        //
        // For example: handle by asking the user to select a different database
        //
        console.error(error);
      } else {
        // Other error handling code
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Home</h1>
    </div>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   console.log("hello");

//   const posts = await getBlogPosts();
//   console.log("ssp: ", posts);

//   return {
//     props: {
//       posts,
//     },
//   };
// };
