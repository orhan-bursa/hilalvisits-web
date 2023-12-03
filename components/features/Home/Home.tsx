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
    <div className="relative w-[100%]">
      <h1
        className={
          babylonica.className +
          " " +
          "absolute right-0 text-[100px] z-30 text-amber-400"
        }
      >
        Hilal Visits
      </h1>
      {/* <h1
        className={
          babylonica.className +
          " " +
          "absolute -right-[5px] top-[5px] opacity-60 text-[100px] text-slate-50 z-20"
        }
      >
        Hilal Visits
      </h1> */}
      <HomeHero data={array(blogs)} />
      <div className="mb-10">
        <HomeBlog data={array(blogs)} />
      </div>
      <HomePhoto data={array(blogs)} />
    </div>
  );
}
