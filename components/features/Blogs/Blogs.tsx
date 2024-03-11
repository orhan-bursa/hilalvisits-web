import { getMenus } from "@/utils/notion";
import { BlogGrid, BlogHeader } from "./sections";
import { BlogPageObject } from "@/types";

export default async function Blogs({ blogs }: { blogs: BlogPageObject[] }) {
  const menus = await getMenus(1);

  return (
    <div className="space-y-6 md:space-y-12 my-8">
      <BlogHeader menus={menus} />
      <BlogGrid items={blogs} />
    </div>
  );
}
