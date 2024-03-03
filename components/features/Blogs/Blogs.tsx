import { BlogGrid, BlogHero } from "./sections";
import { BlogPageObject } from "@/types";

export default function Blogs({ blogs }: { blogs: BlogPageObject[] }) {
  const latestBlog = blogs?.[0];
  const rest = blogs.slice(1);
  return (
    <div>
      <BlogHero item={latestBlog} />
      <BlogGrid items={rest} />
    </div>
  );
}
