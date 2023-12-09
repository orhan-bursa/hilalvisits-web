import {
  HomeHero,
  HomeBlog,
  HomePhoto
} from "./sections"
import array from "@/utils/array";
import { babylonica } from "@/utils/fonts";

type HomePropTypes = {
  blogs: any[];
  photos: any[];
};
export default function Home({ blogs, photos }: HomePropTypes) {

  return (
    <div className="w-[100%]">
      <HomeHero data={array(blogs)} />
      <HomeBlog data={array(blogs)} />
      {/* <div className="w-[100%] bg-amber-400 my-6 h-[1px]"></div>
      <HomePhoto data={array(blogs)} />
      <div className="w-[100%] bg-amber-400 my-6 h-[1px]"></div> */}
    </div>
  );
}
