import { BlogPageObject } from "@/types";
import { CategoryHeader, CategoryBlogs } from "./sections";
import { GetDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

interface IPropTypes {
    items: BlogPageObject[]
    params: { parent?: string, category?: string, sub?: string }
    type: "parent" | "category" | "sub"
    database: GetDatabaseResponse
}
export default function Category({ items, params, type, database }: IPropTypes) {
    return (
        <div className="space-y-12 md:space-y-16 my-8">
            <CategoryHeader params={params} type={type} database={database} />
            <CategoryBlogs items={items} />
        </div>
    )
}