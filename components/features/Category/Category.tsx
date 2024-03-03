import { BlogPageObject, MenuPageObject } from "@/types";
import { CategoryHeader, CategoryBlogs } from "./sections";

interface IPropTypes {
    items: BlogPageObject[]
    slug?: string
    menu?: MenuPageObject
}
export default function Category({ items, slug, menu }: IPropTypes) {
    return (
        <div className="space-y-12 md:space-y-12 my-8">
            <CategoryHeader slug={slug} menu={menu} />
            <CategoryBlogs items={items} />
        </div>
    )
}