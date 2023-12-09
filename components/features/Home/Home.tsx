import { SectionDivider } from "@/components/shared/custom";
import {
  HomeHero,
  HomeBlog,
  HomePhoto
} from "./sections"
import array from "@/utils/array";

type HomePropTypes = {
  blogs: any[];
  photos: any[];
};
export default function Home({ blogs, photos }: HomePropTypes) {

  return (
    <div className="w-full">
      <HomeHero data={array(blogs)} />
      <SectionDivider />
      <HomeBlog data={array(blogs)} />
      <SectionDivider />

      {/* <HomePhoto data={array(blogs)} /> */}
      {/* <div className="w-full bg-amber-400 my-6 h-[1px]"></div> */}
    </div>
  );
}
