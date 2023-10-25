import { NOTION_KEY, NOTION_BLOGS_DB} from "../env"

const { Client } = require("@notionhq/client")

const notion = new Client({
    auth: NOTION_KEY,
})

export const getBlogPosts = async() => {
    const response = await notion.databases.query({
        database_id: NOTION_BLOGS_DB
    }) 

    return response
    
    // ?.results.map((blog:any) => ({
    //     id: blog.id,
    //     title: blog.properties['status'].title[0].text.content,
    //     date: blog.properties['Date'].date.start,
    //     tags: blog.properties['Tags'].multi_select.map((tag) => tag.name),
    //     content: blog.properties['Content'].rich_text[0].text.content,
    //   }));
}