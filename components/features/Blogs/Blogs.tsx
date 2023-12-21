import { SectionDivider } from "@/components";
import { BlogHero } from "./sections";
import BlogGrid from "./sections/BlogGrid";

type BlogPropTypes = {
  blogs: any[];
};

export default function Blogs({ blogs }: BlogPropTypes) {
  const latestBlog = blogs?.[0];
  const rest = blogs.slice(1);
  return (
    <div>
      <BlogHero data={latestBlog} />
      <SectionDivider />
      <BlogGrid data={rest} />
      <SectionDivider />
    </div>
  );
}
