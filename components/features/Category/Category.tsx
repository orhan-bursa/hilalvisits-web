import { BlogPageObject } from "@/types";
import { CategoryHeader, ParentCategoryHeader, SubCategoryHeader, CategoryBlogs } from "./sections";
import { GetDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

interface IPropTypes {
    items: BlogPageObject[]
    params: { parent?: string, category?: string, sub?: string }
    type: "parent" | "category" | "sub"
    database: GetDatabaseResponse
}
export default function Category({ items, params, type, database }: IPropTypes) {
    return (
        <div className="space-y-12 md:space-y-12 my-8">
            {type === "parent" ? <ParentCategoryHeader params={params} database={database} /> : null}
            {type === "category" ? <CategoryHeader params={params} database={database} /> : null}
            {type === "sub" ? <SubCategoryHeader params={params} database={database} /> : null}
            <CategoryBlogs items={items} />
        </div>
    )
}