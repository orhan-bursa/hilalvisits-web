import { BlogPageObject } from "@/types";
import { CategoryHeader, CategoryBlogs } from "./sections";

export default function Category({ items, type }: { items: BlogPageObject[], type: "default" | "parent" | "sub" }) {
    return (
        <div>
            <CategoryHeader />
            <CategoryBlogs />
        </div>
    )
}