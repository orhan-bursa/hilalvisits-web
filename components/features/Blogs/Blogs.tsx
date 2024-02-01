import { SectionDivider } from "@/components";
import { BlogGrid, BlogHero } from "./sections";
import { BlogPageObject } from "@/types";

export default function Blogs({ blogs }: { blogs: BlogPageObject[] }) {
  const latestBlog = blogs?.[0];
  const rest = blogs.slice(1);
  return (
    <div>
      <BlogHero item={latestBlog} />
      <SectionDivider />
      <BlogGrid items={rest} />
      <SectionDivider />
    </div>
  );
}
