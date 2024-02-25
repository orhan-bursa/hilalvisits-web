import {
  HomeHero,
  HomeLatestBlogs,
  HomePhoto
} from "./sections"
import { PhotoPageObject, BlogPageObject } from "@/types";
interface IPropTypes {
  blogs: BlogPageObject[] | undefined;
  photos: PhotoPageObject[] | undefined;
};
export default function Home({ blogs, photos }: IPropTypes) {

  return (
    <div className="space-y-12 md:space-y-16 my-4 md:my-8 ">
      <HomeHero items={blogs} />
      <HomeLatestBlogs items={blogs} />
      <HomePhoto items={photos} />
    </div>
  );
}
