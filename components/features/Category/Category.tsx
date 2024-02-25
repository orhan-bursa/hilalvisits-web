import { BlogPageObject } from "@/types";
import { CategoryHeader, ParentCategoryHeader, SubCategoryHeader, CategoryBlogs } from "./sections";
import { GetDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

interface IPropTypes {
    items: BlogPageObject[]
    params: { parent?: string, category?: string, sub?: string }
    type: "parent" | "category" | "sub"
}
export default function Category({ items, params, type, }: IPropTypes) {
    return (
        <div className="space-y-12 md:space-y-12 my-8">
            {type === "parent" ? <ParentCategoryHeader params={params} /> : null}
            {type === "category" ? <CategoryHeader params={params} /> : null}
            {type === "sub" ? <SubCategoryHeader params={params} /> : null}
            <CategoryBlogs items={items} />
        </div>
    )
}